"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "Free",
    description: "Perfect for beginners",
    features: [
      { name: "Access to a vast library of study material", included: true },
      { name: "Pre-recorded lectures", included: true },
      { name: "Exam-specific quizzes", included: true },
      { name: "24/7 mentor support", included: false },
      { name: "Access to quiz leaderboard", included: false },
      { name: "AI-powered assistance", included: false },
      { name: "3D video illustrations", included: false },
      { name: "Personalized learning path", included: false },
      { name: "Offline access", included: false },
      { name: "Certificate of completion", included: false },
    ],
    popular: false,
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "₹399",
    period: "month",
    description: "Best for serious learners",
    features: [
      { name: "Access to a vast library of study material", included: true },
      { name: "Pre-recorded lectures", included: true },
      { name: "Exam-specific quizzes", included: true },
      { name: "24/7 mentor support", included: true },
      { name: "Access to quiz leaderboard", included: true },
      { name: "AI-powered assistance", included: false },
      { name: "3D video illustrations", included: false },
      { name: "Personalized learning path", included: true },
      { name: "Offline access", included: false },
      { name: "Certificate of completion", included: true },
    ],
    popular: true,
    buttonText: "Upgrade Now",
    buttonVariant: "default" as const,
  },
  {
    id: "advance",
    name: "Advance Plan",
    price: "₹599",
    period: "month",
    description: "For maximum learning potential",
    features: [
      { name: "Access to a vast library of study material", included: true },
      { name: "Pre-recorded lectures", included: true },
      { name: "Exam-specific quizzes", included: true },
      { name: "24/7 mentor support", included: true },
      { name: "Access to quiz leaderboard", included: true },
      { name: "AI-powered assistance", included: true },
      { name: "3D video illustrations", included: true },
      { name: "Personalized learning path", included: true },
      { name: "Offline access", included: true },
      { name: "Certificate of completion", included: true },
    ],
    popular: false,
    buttonText: "Get Premium",
    buttonVariant: "default" as const,
  },
]

const annualDiscount = 20 // 20% discount for annual billing

export default function PremiumPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  const handlePlanSelect = (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to upgrade your plan",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // If user is already on basic plan and selects basic, do nothing
    if (planId === "basic") {
      toast({
        title: "Already on Basic Plan",
        description: "You are already on the Basic Plan",
      })
      return
    }

    setSelectedPlan(planId)
    setShowPaymentDialog(true)
  }

  const handlePayment = () => {
    setProcessingPayment(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false)
      setShowPaymentDialog(false)

      toast({
        title: "Subscription upgraded!",
        description: `You have successfully upgraded to the ${plans.find((plan) => plan.id === selectedPlan)?.name}`,
      })

      // In a real app, you would update the user's subscription in the database here
    }, 2000)
  }

  const calculatePrice = (basePrice: string | number, cycle: "monthly" | "annual") => {
    if (basePrice === "Free") return "Free"

    const price = typeof basePrice === "string" ? Number.parseInt(basePrice.replace(/[^\d]/g, "")) : basePrice

    if (cycle === "annual") {
      const annualPrice = price * 12 * (1 - annualDiscount / 100)
      return `₹${Math.round(annualPrice)}`
    }

    return `₹${price}`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Premium Plans</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to enhance your learning experience with additional features and support
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs
              defaultValue="monthly"
              value={billingCycle}
              onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
              className="w-full max-w-md"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual Billing
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    Save {annualDiscount}%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`h-full flex flex-col relative overflow-hidden transition-all ${
                  plan.popular
                    ? "border-primary shadow-lg scale-105 md:scale-110 z-10"
                    : "hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-0 right-0 rounded-bl-lg rounded-tr-none px-3 py-1" variant="default">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline justify-center">
                    <span className="text-3xl font-bold">{calculatePrice(plan.price, billingCycle)}</span>
                    {plan.period && (
                      <span className="ml-1 text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    variant={plan.buttonVariant}
                    className="w-full"
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={isLoading || (plan.id === "basic" && !user)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Information</AlertTitle>
              <AlertDescription>
                All plans include access to our core quiz platform. You can upgrade or downgrade your plan at any time.
                Annual subscriptions are billed for the full year and offer a {annualDiscount}% discount compared to
                monthly billing.
              </AlertDescription>
            </Alert>

          </div>
        </div>
      </main>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              You're about to upgrade to the {plans.find((plan) => plan.id === selectedPlan)?.name} with{" "}
              {billingCycle === "monthly" ? "monthly" : "annual"} billing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-medium">{plans.find((plan) => plan.id === selectedPlan)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Billing Cycle:</span>
              <span className="font-medium">{billingCycle === "monthly" ? "Monthly" : "Annual"}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium">
                {calculatePrice(plans.find((plan) => plan.id === selectedPlan)?.price || 0, billingCycle)}
                {billingCycle === "monthly" ? "/month" : "/year"}
              </span>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground">
                By proceeding, you agree to our Terms of Service and authorize us to charge your payment method on a
                recurring basis. You can cancel anytime.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={processingPayment}>
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={processingPayment}>
              {processingPayment ? "Processing..." : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
