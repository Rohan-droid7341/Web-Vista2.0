"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutSection() {
  const advantages = [
    {
      title: "Enhance Knowledge & Skills",
      description:
        "Expand your knowledge in various subjects, from history to science, while improving your skills through interactive quizzing.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WSjkJ6TTbuZHpuxEhAXMBYU-X8wFn-BwFQ&s",
    },
    {
      title: "Boost Critical Thinking",
      description:
        "Challenge your mind and enhance your critical thinking abilities by solving thought-provoking questions.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc6lhGH3mNC6tZWfrSUqd2Z3EDucCY-6NiHQ&s",
    },
    {
      title: "Productive Entertainment",
      description:
        "A unique blend of entertainment and education, making it the perfect destination for those seeking productive leisure.",
      image: "https://thehardcopy.co/wp-content/uploads/kab-banega.jpg",
    },
  ]

  const facts = [
    {
      title: "Quiz Fever!!",
      description: "The average person spends 16 days of their life taking quizzes online!!",
    },
    {
      title: "Paws-itively Popular Topics!",
      description: "Did you know? The most popular quiz topics are animals and pop culture!",
    },
    {
      title: "Brain Booster!",
      description: "Quizzes can boost knowledge retention by up to 70%!",
    },
    {
      title: "Quiz Time, All the Time!",
      description: "Our team loves quizzes so much, we even quiz each other during meetings!",
    },
  ]

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
    <section className="py-16 bg-black" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your ultimate quiz destination! We're passionate about creating engaging and educational experiences for
            quiz enthusiasts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16 bg-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Key Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Multiple quiz categories (History, Science and more)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Interactive quiz interface with different difficulty levels
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Regularly updated question bank
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              Secure and private user data
            </li>
          </ul>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Why Choose QuizRizz?</h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {advantages.map((advantage, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={advantage.image || "/placeholder.svg"}
                      alt={advantage.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{advantage.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{advantage.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="bg-primary rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
          <p className="text-center max-w-3xl mx-auto">
            At QuizRizz, our mission is to spark curiosity and foster learning in a fun and engaging way. We believe
            that education doesn't have to be boring, and we're dedicated to providing a platform that makes learning
            interactive, competitive, and enjoyable for everyone. We aim to create a community where knowledge is
            celebrated, curiosity is encouraged, and everyone can sharpen their minds while having fun.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Quiz Facts</h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {facts.map((fact, index) => (
              <motion.div key={index} variants={item}>
                <Card className="h-full hover:shadow-md transition-shadow bg-orange-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{fact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{fact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
