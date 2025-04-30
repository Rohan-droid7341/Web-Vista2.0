"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Calendar } from "lucide-react"

const globalEvents = [
  {
    id: 1,
    title: "Nobel Prize Announcements",
    description: "Stay updated with the latest Nobel Prize winners across various categories.",
    link: "https://www.nobelprize.org/prizes/lists/all-nobel-prizes/",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nobel_Prize.png/330px-Nobel_Prize.png",
    date: "October 2024",
  },
  {
    id: 2,
    title: "Breakthrough in Cancer Research",
    description: "Learn about the latest advancements in cancer treatment and research.",
    link: "#",
    image: "https://pme.uchicago.edu/sites/default/files/styles/max_width_full/public/2021-03/iStock-1180568434%20%281%29.jpg?itok=aXUNgdkT",
    date: "Ongoing",
  },
  {
    id: 3,
    title: "Climate Change Summit",
    description: "Global leaders gather to discuss climate action and sustainability goals.",
    link: "https://www.youtube.com/watch?v=GR46_ohNh9U&t=252s",
    image: "https://cdn.prod.website-files.com/62733f1361e2ad64f8790984/627401da7431d857b71909df_61312eab139acb3d412e7df7_sustainlife-why-climate-change-matters.jpeg",
    date: "November 2024",
  },
]

const subjectEvents = {
  maths: [
    {
      id: 1,
      title: "Top Breakthroughs in Maths",
      description: "Discover the latest mathematical breakthroughs and their applications.",
      link: "#",
      date: "Ongoing",
    },
    {
      id: 2,
      title: "Increase in computational power",
      description: "How computational advancements are transforming mathematical research.",
      link: "#",
      date: "September 2024",
    },
  ],
  physics: [
    {
      id: 1,
      title: "Physics simulations using AI developed",
      description: "New AI models are revolutionizing physics simulations and predictions.",
      link: "#",
      date: "August 2024",
    },
    {
      id: 2,
      title: "Astrophysics Symposium",
      description: "Join leading astrophysicists discussing the latest discoveries in space.",
      link: "#",
      date: "October 2024",
    },
  ],
  chemistry: [
    {
      id: 1,
      title: "Top Chemistry Breakthroughs",
      description: "Explore the most significant recent discoveries in chemistry.",
      link: "https://www.youtube.com/watch?v=w8Zp87G9BmE",
      date: "July 2024",
    },
    {
      id: 2,
      title: "Biochemistry discoveries 2024",
      description: "The latest findings at the intersection of biology and chemistry.",
      link: "https://www.youtube.com/watch?v=gg7WjuFs8F4",
      date: "Ongoing",
    },
  ],
}

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState("global")

  return (
    <section className="py-16 bg-black" id="events">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Events & News</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with ongoing events in various subjects and global educational news
          </p>
        </div>

        <Tabs defaultValue="global" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 w-full mb-8">
            <TabsTrigger value="global" onClick={() => setActiveTab("global")}>
              Global
            </TabsTrigger>
            <TabsTrigger value="maths" onClick={() => setActiveTab("maths")}>
              Mathematics
            </TabsTrigger>
            <TabsTrigger value="physics" onClick={() => setActiveTab("physics")}>
              Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry" onClick={() => setActiveTab("chemistry")}>
              Chemistry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {globalEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription>{event.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={event.link}
                        className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        Learn more <ChevronRight className="h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {Object.entries(subjectEvents).map(([subject, events]) => (
            <TabsContent key={subject} value={subject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <CardDescription>{event.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link
                          href={event.link}
                          className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                          Learn more <ChevronRight className="h-4 w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
