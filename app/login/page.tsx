"use client" // Add if using App Router

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation" // Use 'next/router' for Pages Router
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"

// Define the URL of your Spring Boot backend
const BACKEND_URL = 'http://localhost:8080'; // Ensure this is correct

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) { /* ... validation toast ... */ return }
    if (!/\S+@\S+\.\S+/.test(email)) { /* ... validation toast ... */ return; }

    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let responseData;
      const responseBodyText = await response.text();
      try {
          // Assume backend sends JSON on success, text on failure
          if (response.ok) {
              responseData = JSON.parse(responseBodyText);
          } else {
               responseData = responseBodyText; // Use text for error message
          }
      } catch (jsonError) {
          responseData = responseBodyText; // Fallback to text if JSON parsing fails unexpectedly
          console.error("Failed to parse response:", responseBodyText);
      }

      if (response.ok && typeof responseData === 'object') {
        // Login successful
        const successMessage = responseData.message || "Login successful!";
        const userName = responseData.fullName || 'User';

        toast({
          title: "Login Successful",
          description: `Welcome back, ${userName}!`,
        });

        // --- Store user data in sessionStorage ---
        try {
            // Remove sensitive data like password if backend accidentally sent it
            delete responseData.password;
            sessionStorage.setItem('loggedInUser', JSON.stringify(responseData));
            console.log("User data stored in sessionStorage:", responseData);
        } catch (storageError) {
            console.error("Failed to store user data in sessionStorage:", storageError);
            // Proceed without storing if it fails, but log error
        }
        // --- End Store user data ---

        router.push("/dashboard"); // Redirect to dashboard

      } else {
        // Login failed
        const errorMessage = typeof responseData === 'string' ? responseData : (responseData?.message || responseData?.error || "Invalid email or password.");
        toast({
          title: `Login Failed (${response.status})`,
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Network Error",
        description: "Could not connect to the login server.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- JSX Structure (Same as before) ---
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
       <Card className="w-full max-w-md shadow-lg">
         {/* ... CardHeader ... */}
         <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
              </div>
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
         <CardContent>
           <form onSubmit={handleLogin} className="space-y-4">
             {/* ... Email Input ... */}
              <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} required />
              </div>
             {/* ... Password Input ... */}
              <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required />
                    <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
              </div>
             {/* ... Login Button ... */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</>) : ("Login")}
              </Button>
           </form>
         </CardContent>
         {/* ... CardFooter ... */}
          <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-muted-foreground mt-2">
                Don't have an account?{" "} <Link href="/signup" className="text-primary hover:underline"> Sign up here </Link>
              </p>
          </CardFooter>
       </Card>
     </div>
  )
}