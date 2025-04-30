"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

const subjects = [
  {
    id: "mathematics",
    title: "Mathematics",
    description:
      "Our mathematics quizzes are designed to strengthen your problem-solving skills and enhance your understanding of key concepts.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/138744_830259.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "physics",
    title: "Physics",
    description:
      "The physics quiz is a journey into the laws of nature, testing your grasp of motion, energy, and the forces that govern our universe.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/953446_989058.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "A chemistry quiz is an exciting journey through the reactions and elements that shape our world.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/795623_660041.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "biology",
    title: "Biology",
    description:
      "A biology quiz invites you to dive into the wonders of life, from the tiniest cells to complex ecosystems.",
    image: "https://cdn.pixabay.com/photo/2018/09/06/18/49/bacteria-3658992_1280.jpg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "history",
    title: "History",
    description:
      "A history quiz takes you on a journey through time, testing your knowledge of the events that shaped our world.",
    image: "https://i.ytimg.com/vi/F0Gkr4MBEO0/hqdefault.jpg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "geography",
    title: "Geography",
    description: "A geography quiz takes you on a journey across diverse landscapes and cultures.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/71239_897290.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
  },
]

export default function SubjectsSection() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

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

  const filteredSubjects = activeTab === "all" ? subjects : subjects.filter((subject) => subject.id === activeTab)

  return (
    <section className="py-16 bg-gray-50" id="subjects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Subjects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master your subjects with our interactive quizzes designed to enhance your learning experience
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="mathematics" onClick={() => setActiveTab("mathematics")}>
              Math
            </TabsTrigger>
            <TabsTrigger value="physics" onClick={() => setActiveTab("physics")}>
              Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry" onClick={() => setActiveTab("chemistry")}>
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="biology" onClick={() => setActiveTab("biology")}>
              Biology
            </TabsTrigger>
            <TabsTrigger value="history" onClick={() => setActiveTab("history")}>
              History
            </TabsTrigger>
            <TabsTrigger value="geography" onClick={() => setActiveTab("geography")}>
              Geography
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSubjects.map((subject) => (
            <motion.div key={subject.id} variants={item}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={subject.image || "/placeholder.svg"}
                    alt={subject.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{subject.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{subject.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div className="flex flex-wrap gap-2">
                    {subject.difficulty.map((level) => (
                      <span key={level} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {level}
                      </span>
                    ))}
                  </div>
                  <Link href={user ? `/quiz/${subject.id}` : "/login"} className="w-full">
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/subjects">
            <Button variant="outline" size="lg">
              View All Subjects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
