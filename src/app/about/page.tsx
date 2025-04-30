import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Users, BookOpen, Lightbulb } from "lucide-react"

const teamMembers = [
  {
    name: "Rohan Garg",
    role: "Co-Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/rohan-garg-679928327/",
  },
  {
    name: "Rushil Dhingra",
    role: "Co-Founder & CTO",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/rushil-dhingra-b15276316",
  },
  {
    name: "Chirag Shirsath",
    role: "Lead Developer",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/chirag-shirsath-03868a325",
  },
  {
    name: "Anisha Chillamacharla",
    role: "UI/UX Designer",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/anisha-chillamacharla-06652a325",
  },
  {
    name: "Aditya Shingare",
    role: "Content Manager",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/adityashingare",
  },
  {
    name: "Ishaan Bansal",
    role: "Marketing Director",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/ishaan-bansal-2977a7317",
  },
  {
    name: "Kaustubh Goge",
    role: "Educational Consultant",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/kaustubh-goge-622696325",
  },
  {
    name: "Pratik Kapure",
    role: "Business Development",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "https://www.linkedin.com/in/pratik-kapure-919639313",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About QuizRizz</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Your ultimate quiz destination! We're passionate about creating engaging and educational experiences for
              quiz enthusiasts of all ages.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/subjects">
                <Button size="lg">Explore Quizzes</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">How we started and where we're headed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Our Story"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">From Classroom to Digital Platform</h3>
                <p className="text-muted-foreground">
                  QuizRizz began in 2022 as a small project at the Indian Institute of Information Technology Lucknow,
                  where a group of passionate students wanted to make learning more engaging and accessible.
                </p>
                <p className="text-muted-foreground">
                  What started as a simple quiz tool for classmates quickly evolved into a comprehensive learning
                  platform that now serves thousands of students across the country. Our mission has always been to
                  spark curiosity and foster learning in a fun and engaging way.
                </p>
                <p className="text-muted-foreground">
                  Today, QuizRizz offers quizzes across multiple subjects, interactive learning materials, and
                  personalized learning paths to help students achieve their academic goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Make Learning Fun</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    We believe that education doesn't have to be boring. Our interactive quizzes and engaging content
                    make learning an enjoyable experience for everyone.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Accessible Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    We're committed to making quality educational resources accessible to all students, regardless of
                    their background or location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Foster Curiosity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    We aim to spark curiosity and encourage a lifelong love of learning through our content and platform
                    design.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 bg-white p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
              <p className="text-center text-lg">
                At QuizRizz, our mission is to spark curiosity and foster learning in a fun and engaging way. We believe
                that education doesn't have to be boring, and we're dedicated to providing a platform that makes
                learning interactive, competitive, and enjoyable for everyone. We aim to create a community where
                knowledge is celebrated, curiosity is encouraged, and everyone can sharpen their minds while having fun.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">The passionate individuals behind QuizRizz</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground mb-2">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quiz Facts</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">Interesting tidbits about quizzes and learning</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Fever!!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The average person spends 16 days of their life taking quizzes online!!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Paws-itively Popular Topics!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Did you know? The most popular quiz topics are animals and pop culture!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Brain Booster!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Quizzes can boost knowledge retention by up to 70%!</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Time, All the Time!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our team loves quizzes so much, we even quiz each other during meetings!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Become part of our growing community of learners and quiz enthusiasts. Start your learning journey with
                QuizRizz today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg">Sign Up Now</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
