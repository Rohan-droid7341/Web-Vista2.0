"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation" // Import useRouter for logout redirect
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// Removed: import { useAuth } from "@/hooks/use-auth" // Remove useAuth

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter(); // Add useRouter for navigation
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [userName, setUserName] = useState<string | null>(null); // Optional: store user name
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile sheet

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
        const storedUserData = sessionStorage.getItem('loggedInUser');
        if (storedUserData) {
          try {
            const parsedData = JSON.parse(storedUserData);
             if (parsedData && parsedData.email) { // Check for existence of essential data
                setIsLoggedIn(true);
                setUserName(parsedData.fullName || null); // Store name if available
                console.log("Navbar: User is logged in", parsedData.fullName);
             } else {
                 setIsLoggedIn(false);
                 setUserName(null);
             }
          } catch (error) {
            console.error("Navbar: Failed to parse user data from storage", error);
            setIsLoggedIn(false); // Assume logged out if data is corrupt
            setUserName(null);
            sessionStorage.removeItem('loggedInUser'); // Clean up corrupted data
          }
        } else {
          setIsLoggedIn(false);
           setUserName(null);
           console.log("Navbar: User is not logged in");
        }
    };

    checkLoginStatus();

    // Optional: Listen for storage changes if login/logout might happen in other tabs
    // window.addEventListener('storage', checkLoginStatus);
    // return () => window.removeEventListener('storage', checkLoginStatus);

  }, [pathname]); // Re-check on path change in case sessionStorage is cleared elsewhere

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const isMobile = useMobile(); // Assuming useMobile hook works correctly

  // Logout Handler
  const handleLogout = () => {
      sessionStorage.removeItem('loggedInUser'); // Clear stored data
      setIsLoggedIn(false); // Update state
      setUserName(null);
      setIsMobileMenuOpen(false); // Close mobile menu if open
      router.push('/login'); // Redirect to login page
      console.log("Navbar: User logged out.");
  };

  const navLinks = [ /* ... (keep your navLinks array) ... */
     { href: "/", label: "Home" }, { href: "/subjects", label: "Subjects" }, { href: "/events", label: "Events" }, { href: "/study-materials", label: "Study Material" }, { href: "/premium", label: "Premium" }, { href: "/about", label: "About Us" }, { href: "/contact", label: "Contact Us" },
  ];

  // Function to close mobile sheet on link click
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white backdrop-blur-md shadow-sm" : "bg-black backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
           <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="font-bold text-xl hidden sm:inline-block text-primary">QuizRizz</span>
           </Link>
           {!isMobile && (
              <nav className="hidden md:flex items-center gap-6">
                 {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}>
                       {link.label}
                    </Link>
                 ))}
              </nav>
           )}
        </div>

        {/* Mobile Menu / Desktop Auth Buttons */}
        {isMobile ? (
          // --- Mobile Sheet ---
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" /> <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMobileMenu} className="text-base font-medium transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                  {/* --- Mobile Auth Buttons --- */}
                  {isLoggedIn ? (
                    <>
                       <Link href="/dashboard" onClick={closeMobileMenu}> <Button variant="outline" className="w-full">Dashboard</Button> </Link>
                       <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button> {/* Use handleLogout */}
                    </>
                  ) : (
                    <>
                       <Link href="/login" onClick={closeMobileMenu}> <Button variant="outline" className="w-full">Login</Button> </Link>
                       <Link href="/signup" onClick={closeMobileMenu}> <Button className="w-full">Sign Up</Button> </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          // --- Desktop Auth Buttons ---
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard"> <Button variant="outline">Dashboard</Button> </Link>
                <Button variant="destructive" onClick={handleLogout}>Logout</Button> {/* Use handleLogout */}
              </>
            ) : (
              <>
                <Link href="/login"> <Button variant="outline">Login</Button> </Link>
                <Link href="/signup"> <Button>Sign Up</Button> </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

// Keep useMobile hook
function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile(); window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [])
  return isMobile
}