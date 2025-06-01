"use client"; // For App Router

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Or 'next/router' for Pages Router
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui
import { Input } from '@/components/ui/input';   // Assuming shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Assuming shadcn/ui
import { ScrollArea } from "@/components/ui/scroll-area"; // For better scroll control
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For user icons 
import { SendHorizonal, LogOut, UserCircle2, Loader2, Wifi, WifiOff } from 'lucide-react';

// Define an interface for our message structure
interface Message {
  sender: string; // This will be the user's full name or email
  senderEmail?: string; // Store email to uniquely identify sender for avatar, etc.
  content: string;
  type: 'CHAT' | 'JOIN' | 'LEAVE' | 'SYSTEM'; // System for general info/errors
  timestamp?: string; // ISO string timestamp
}

interface UserData {
  id: string | number; // Or whatever unique ID your backend provides
  email: string;
  fullName: string;
  // Add other relevant fields like role, profilePictureUrl, etc.
}

const ChatPage = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false); // For initial connection attempt
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Authentication Check and User Data Retrieval
  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const userData: UserData = JSON.parse(storedUser);
        if (userData && userData.email && userData.fullName) {
          setCurrentUser(userData);
        } else {
          router.push('/login'); // Invalid user data
        }
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage", error);
        router.push('/login'); // Error parsing, redirect
      }
    } else {
      router.push('/login'); // No user found, redirect
    }
    setIsLoadingUser(false);
  }, [router]);

  // WebSocket connection logic
  useEffect(() => {
    if (!currentUser || !currentUser.email) {
      // If connection was active and user logged out/changed, close it.
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        setIsConnected(false);
        setIsConnecting(false);
      }
      return;
    }

    // Prevent multiple connections
    if (socketRef.current && (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING)) {
        return;
    }

    setIsConnecting(true);
    const wsUrl = 'ws://localhost:8081/chat'; // Backend runs on port 8081
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setIsConnecting(false);
      const joinMessage: Message = {
        sender: currentUser.fullName,
        senderEmail: currentUser.email,
        content: `${currentUser.fullName} joined the chat!`,
        type: 'JOIN',
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(joinMessage));
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const receivedMsg: Message = JSON.parse(event.data as string);
        setMessages((prevMessages) => [...prevMessages, receivedMsg]);
      } catch (error) {
        console.error('Error parsing message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'System', content: `Received unreadable message.`, type: 'SYSTEM', timestamp: new Date().toISOString() },
        ]);
      }
    };

    socket.onclose = (event: CloseEvent) => {
      console.log('WebSocket disconnected. Code:', event.code, 'Reason:', event.reason);
      setIsConnected(false);
      setIsConnecting(false);
      // Optionally add a system message about disconnection if it wasn't a clean close
      if (!event.wasClean && currentUser) { // Only show if user was supposed to be connected
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'System', content: 'Connection lost. Attempting to reconnect or refresh.', type: 'SYSTEM', timestamp: new Date().toISOString() },
        ]);
      }
    };

    socket.onerror = (errorEvent: Event) => {
      console.error('WebSocket error:', errorEvent);
      setIsConnected(false);
      setIsConnecting(false);
      if (currentUser) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'System', content: 'Error connecting to chat server.', type: 'SYSTEM', timestamp: new Date().toISOString() },
        ]);
      }
    };

    // Cleanup on unmount or when currentUser changes
    return () => {
      if (socketRef.current) {
        console.log("Closing WebSocket connection on cleanup");
        // Optionally send a LEAVE message
        if (currentUser && socketRef.current.readyState === WebSocket.OPEN) {
             const leaveMessage: Message = {
                sender: currentUser.fullName,
                senderEmail: currentUser.email,
                content: `${currentUser.fullName} left the chat.`,
                type: 'LEAVE',
                timestamp: new Date().toISOString(),
              };
            socketRef.current.send(JSON.stringify(leaveMessage));
        }
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [currentUser]); // Re-run effect if currentUser changes

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() && socketRef.current && isConnected && currentUser) {
      const chatMessage: Message = {
        sender: currentUser.fullName,
        senderEmail: currentUser.email,
        content: newMessage.trim(),
        type: 'CHAT',
        timestamp: new Date().toISOString(),
      };
      socketRef.current.send(JSON.stringify(chatMessage));
      setNewMessage('');
    }
  };

  const handleLogout = () => {
    if (socketRef.current && currentUser) {
        // Send leave message
        const leaveMessage: Message = {
          sender: currentUser.fullName,
          senderEmail: currentUser.email,
          content: `${currentUser.fullName} logged out.`,
          type: 'LEAVE',
          timestamp: new Date().toISOString(),
        };
        socketRef.current.send(JSON.stringify(leaveMessage));
    }
    sessionStorage.removeItem('loggedInUser');
    setCurrentUser(null); // This will trigger the useEffect to close socket
    router.push('/login');
  };

  // --- Loading state or if no user (should be redirected by useEffect) ---
  if (isLoadingUser || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading user data...</p>
      </div>
    );
  }

  // --- Main Chat UI ---
  return (
    <div className="flex flex-col h-screen bg-secondary">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-card border-b border-border shadow-sm">
        <div className="flex items-center space-x-3">
          <Avatar>
            {/* Placeholder, replace with actual user avatar logic if available */}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {currentUser.fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold text-card-foreground">{currentUser.fullName}</CardTitle>
            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isConnecting && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
          {isConnected && <Wifi className="h-5 w-5 text-green-500" />}
          {!isConnected && !isConnecting && <WifiOff className="h-5 w-5 text-red-500" />}
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((msg, index) => {
          const isCurrentUserMessage = msg.senderEmail === currentUser.email;
          const messageTime = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

          if (msg.type === 'JOIN' || msg.type === 'LEAVE' || msg.type === 'SYSTEM') {
            return (
              <div key={index} className="text-center text-xs text-muted-foreground py-2">
                <span>{msg.content}</span>
                {messageTime && <span className="ml-1">({messageTime})</span>}
              </div>
            );
          }

          return (
            <div
              key={index}
              className={`flex ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end max-w-[70%] space-x-2 ${isCurrentUserMessage ? 'flex-row-reverse' : ''}`}>
                {!isCurrentUserMessage && (
                  <Avatar className="h-8 w-8 mb-1">
                    <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                        {msg.sender.substring(0,1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                 <div
                  className={`p-3 rounded-xl shadow ${
                    isCurrentUserMessage
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground border border-border rounded-bl-none'
                  }`}
                >
                  {!isCurrentUserMessage && (
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{msg.sender}</p>
                  )}
                  <p className="text-sm text-balance">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isCurrentUserMessage ? 'text-blue-200' : 'text-muted-foreground/80'} ${isCurrentUserMessage ? 'text-right' : 'text-left'}`}>
                    {messageTime}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Anchor for auto-scrolling */}
      </ScrollArea>

      {/* Input Area */}
      <footer className="p-4 bg-card border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type a message..." : "Connecting to chat..."}
            className="flex-grow bg-muted focus-visible:ring-1 focus-visible:ring-ring"
            disabled={!isConnected || isConnecting}
            autoComplete="off"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!isConnected || isConnecting || !newMessage.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <SendHorizonal className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;