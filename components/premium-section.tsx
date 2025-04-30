"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

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
    ],
    popular: false,
    buttonText: "Get Started",
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
    ],
    popular: false,
    buttonText: "Get Premium",
    buttonVariant: "default" as const,
  },
]

export default function PremiumSection() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 bg-gray-50" id="premium">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Premium Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to enhance your learning experience with additional features and support
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={item}>
              <Card
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
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-muted-foreground">/{plan.period}</span>}
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
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground line-through"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href={user ? `/premium/${plan.id}` : "/login"} className="w-full">
                    <Button variant={plan.buttonVariant} className="w-full" onClick={() => setSelectedPlan(plan.id)}>
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">
            All plans include access to our core quiz platform. Upgrade anytime to unlock additional features.
          </p>
          <Link href="/premium">
            <Button variant="link">View full plan comparison</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
