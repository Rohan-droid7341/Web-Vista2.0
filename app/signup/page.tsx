  "use client"

  import type React from "react"
  import { useState, useEffect } from "react"
  import Link from "next/link"
  import Image from "next/image"
  import { useRouter } from "next/navigation"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { Checkbox } from "@/components/ui/checkbox"
  import { useToast } from "@/hooks/use-toast"
  import { Eye, EyeOff, Loader2 } from "lucide-react"

  // UPDATE If your backend runs elsewhere or you change the port
  const BACKEND_URL = 'http://localhost:8080';

  export default function SignupPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false) // General loading for OTP steps
    const [isCompletingSignup, setIsCompletingSignup] = useState(false); // Specific loading for final registration
    const [showPassword, setShowPassword] = useState(false)
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      mobile: "",
      gender: "male",
      role: "student",
      education: "",
      password: "",
      terms: false,
    })

    useEffect(() => {
      if (!isOtpSent) {
        setOtp("");
      }
    }, [isOtpSent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    const handleSelectChange = (name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // --- Step 1: Request OTP ---
    const handleRequestOtp = async (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) { toast({ title: "Missing Info", description: "Please fill required fields.", variant: "destructive" }); return }
      if (!/\S+@\S+\.\S+/.test(formData.email)) { toast({ title: "Invalid Email", description: "Enter a valid email.", variant: "destructive"}); return; }
      if (!formData.terms) { toast({ title: "Terms Required", description: "Please agree to terms.", variant: "destructive" }); return }

      setIsLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/request-otp`, { // Corrected Path
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });
        const responseBody = await response.text();
        if (response.ok) {
          toast({ title: "OTP Sent", description: responseBody || "Check your email." });
          setIsOtpSent(true);
        } else {
          // Handle conflict (email exists) or other errors
          toast({ title: `Error (${response.status})`, description: responseBody || "Failed to send OTP.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Request OTP Error:", error);
        toast({ title: "Network Error", description: "Could not connect.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    // --- Step 2: Verify OTP ---
    const handleVerifyOtp = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!otp || !/^\d{6}$/.test(otp)) {
        toast({ title: "Invalid OTP", description: "Enter the 6-digit OTP.", variant: "destructive" });
        return;
      }
      setIsLoading(true); // Use main loading state

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, { // Corrected Path
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, otp: otp }),
        });
        const responseBody = await response.text();

        if (response.ok) {
          toast({ title: "OTP Verified!", description: "Completing registration..." });
          // --- Verification successful, NOW register the user ---
          await completeSignup(); // Call the final registration step
        } else {
          toast({ title: `Verification Failed (${response.status})`, description: responseBody || "Invalid/expired OTP.", variant: "destructive" });
          setIsLoading(false); // Stop loading if verification fails
        }
      } catch (error) {
        console.error("Verify OTP Error:", error);
        toast({ title: "Network Error", description: "Could not verify OTP.", variant: "destructive" });
        setIsLoading(false); // Stop loading on network error
      }
      // Don't reset isLoading here if verification was ok, let completeSignup handle it
    };

    // --- Step 3: Complete Signup (Register User) ---
    const completeSignup = async () => {
        setIsCompletingSignup(true);
        setIsLoading(true); // Ensure buttons remain disabled

        try {
          const response = await fetch(`${BACKEND_URL}/api/auth/register`, { // Corrected Path
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData), // Send all collected data
          });
          const responseBody = await response.text();

          if (response.ok || response.status === 201) { // 201 Created is ideal
              toast({ title: "Account Created!", description: responseBody || "Welcome! You can now log in." });
              router.push("/login"); // Redirect to login page
          } else {
              // Handle registration errors (e.g., email conflict 409)
              toast({ title: `Registration Failed (${response.status})`, description: responseBody || "Could not create account.", variant: "destructive" });
          }

        } catch(error) {
            console.error("Complete Signup Error:", error);
            toast({ title: "Network Error", description: "Failed to complete registration.", variant: "destructive" });
        } finally {
            setIsCompletingSignup(false);
            setIsLoading(false); // Reset all loading states
        }
    }

    // Determine if buttons should be disabled (covers both loading states)
    const isButtonDisabled = isLoading || isCompletingSignup;

    // --- JSX ---
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              {isOtpSent ? `Enter the OTP sent to ${formData.email}` : "Enter your information to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!isOtpSent ? (
              // --- Initial Signup Form ---
              <form onSubmit={handleRequestOtp} className="space-y-4">
                {/* --- Inputs (Ensure disabled={isButtonDisabled}) --- */}
                <div className="space-y-2"> <Label htmlFor="fullName">Full Name</Label> <Input id="fullName" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} disabled={isButtonDisabled} required /> </div>
                <div className="space-y-2"> <Label htmlFor="email">Email</Label> <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} disabled={isButtonDisabled} required /> </div>
                <div className="space-y-2"> <Label htmlFor="mobile">Mobile Number</Label> <Input id="mobile" name="mobile" type="tel" placeholder="Enter your mobile number" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} disabled={isButtonDisabled} required /> </div>
                <div className="space-y-2"> <Label>Gender</Label> <RadioGroup defaultValue="male" value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} className="flex space-x-4"> <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" disabled={isButtonDisabled}/><Label htmlFor="male" className="cursor-pointer">Male</Label></div> <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" disabled={isButtonDisabled}/><Label htmlFor="female" className="cursor-pointer">Female</Label></div> <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" disabled={isButtonDisabled}/><Label htmlFor="other" className="cursor-pointer">Other</Label></div> </RadioGroup> </div>
                <div className="space-y-2"> <Label>Who Are You?</Label> <RadioGroup defaultValue="student" value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} className="flex space-x-4"> <div className="flex items-center space-x-2"><RadioGroupItem value="student" id="student" disabled={isButtonDisabled}/><Label htmlFor="student" className="cursor-pointer">Student</Label></div> <div className="flex items-center space-x-2"><RadioGroupItem value="teacher" id="teacher" disabled={isButtonDisabled}/><Label htmlFor="teacher" className="cursor-pointer">Teacher</Label></div> <div className="flex items-center space-x-2"><RadioGroupItem value="parent" id="parent" disabled={isButtonDisabled}/><Label htmlFor="parent" className="cursor-pointer">Parent</Label></div> </RadioGroup> </div>
                <div className="space-y-2"> <Label htmlFor="education">Educational Qualification</Label> <Select value={formData.education} onValueChange={(value) => handleSelectChange("education", value)} disabled={isButtonDisabled}> <SelectTrigger><SelectValue placeholder="Select your qualification" /></SelectTrigger> <SelectContent> <SelectItem value="high-school">High School</SelectItem> <SelectItem value="undergraduate">Undergraduate</SelectItem> <SelectItem value="postgraduate">Postgraduate</SelectItem> <SelectItem value="phd">PhD</SelectItem> </SelectContent> </Select> </div>
                <div className="space-y-2"> <Label htmlFor="password">Password</Label> <div className="relative"> <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={handleChange} disabled={isButtonDisabled} required /> <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)} disabled={isButtonDisabled}> {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span> </Button> </div> </div>
                <div className="flex items-center space-x-2"> <Checkbox id="terms" name="terms" checked={formData.terms} onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, terms: checked === true }))} disabled={isButtonDisabled} /> <Label htmlFor="terms" className="text-sm"> I agree to the <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link></Label> </div>

                <Button type="submit" className="w-full" disabled={isButtonDisabled}>
                  {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending OTP...</>) : ("Send Verification Code")}
                </Button>
              </form>
            ) : (
              // --- OTP Verification Form ---
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2"> <Label htmlFor="emailDisplay">Email</Label> <Input id="emailDisplay" type="email" value={formData.email} readOnly disabled className="bg-gray-100" /> </div>
                <div className="space-y-2"> <Label htmlFor="otp">Verification Code</Label> <Input id="otp" name="otp" type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required disabled={isButtonDisabled} className="text-center tracking-[0.3em]" /> </div>

                <Button type="submit" className="w-full" disabled={isButtonDisabled}>
                  {isLoading || isCompletingSignup ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isCompletingSignup ? 'Registering...' : 'Verifying...'} </>) : ("Verify OTP & Complete Signup")}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsOtpSent(false)} disabled={isButtonDisabled}>
                  Back to Edit Details
                </Button>
              </form>
            )}

            {!isOtpSent && (
              <>
                <div className="relative my-6"> <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div> <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with</span></div> </div>
                <div className="grid grid-cols-2 gap-4"> <Button variant="outline" type="button" disabled={isButtonDisabled}><Image src="/google.svg" alt="Google" width={16} height={16} className="mr-2 h-4 w-4" />Google</Button> <Button variant="outline" type="button" disabled={isButtonDisabled}><Image src="/facebook.svg" alt="Facebook" width={16} height={16} className="mr-2 h-4 w-4" />Facebook</Button> </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground mt-2">
              {isOtpSent ? 'Did not receive code? Check spam or ' : 'Already have an account? '}
              {isOtpSent ? ( <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleRequestOtp()} disabled={isButtonDisabled}> {isLoading ? 'Resending...' : 'Resend OTP'} </Button> ) : ( <Link href="/login" className="text-primary hover:underline">Login here</Link> )}
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }