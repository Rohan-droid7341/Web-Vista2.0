// src/components/chatbase-bubble.tsx
"use client"; // This component manipulates the DOM and uses browser APIs

import Script from "next/script";
import { useEffect, useState } from "react";

const ChatbaseBubble = () => {
  const chatbotId = "ul7sDPAmpSYbGvRlRxdKc";
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client-side
    setIsClient(true);
  }, []);

  if (!chatbotId) {
    console.warn(
      "Chatbase chatbot ID (NEXT_PUBLIC_CHATBASE_CHATBOT_ID) is not configured in .env.local. Chat bubble will not load."
    );
    return null;
  }

  if (!isClient) {
    // Don't render script on server
    return null;
  }

  // This is the script provided by Chatbase, with the chatbotId made dynamic
  // and a few minor best-practice adjustments (defer, once listener).
  const chatbaseLoaderScript = `
(function(){
    const currentChatbotId = "${chatbotId}"; // Use the ID from env var

    // Original Chatbase conditional initialization for window.chatbase
    if(!window.chatbase || (typeof window.chatbase.getState === 'function' && window.chatbase("getState")!=="initialized") || typeof window.chatbase.getState !== 'function'){
        
        const existingQueue = (window.chatbase && window.chatbase.q) ? window.chatbase.q : [];

        window.chatbase = (...args) => { // Renamed 'arguments' to 'args' for clarity with arrow functions
            if(!window.chatbase.q){
                window.chatbase.q=[]
            }
            window.chatbase.q.push(args); // 'args' is already an array here
        };
        window.chatbase.q = existingQueue; // Restore or initialize queue

        window.chatbase = new Proxy(window.chatbase, {
            get(target, prop){
                if(prop === "q"){
                    return target.q;
                }
                // This proxy setup allows calling methods like window.chatbase.methodName(...args)
                // which then calls the underlying target function as target("methodName", ...args)
                return (...args) => target(prop, ...args);
            }
        });
    }
    
    const onLoad = function(){
        // Prevent re-adding the script if it somehow gets called multiple times
        if(document.getElementById(currentChatbotId)) {
          return;
        }
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = currentChatbotId; // This ID is crucial for Chatbase
        // script.domain = "www.chatbase.co"; // This attribute is non-standard for <script> and generally not needed. Omitting.
        script.defer = true; // Good practice for non-blocking scripts
        document.body.appendChild(script);
    };

    if(document.readyState === "complete"){
        onLoad();
    } else {
        // Use { once: true } to ensure the listener is removed after firing
        window.addEventListener("load", onLoad, { once: true });
    }
})();
  `;

  return (
    <Script
      id="chatbase-loader-script" // An ID for this inline script tag itself, for Next.js
      strategy="afterInteractive" // Load after the page is interactive
      dangerouslySetInnerHTML={{ __html: chatbaseLoaderScript }}
    />
  );
};

export default ChatbaseBubble;