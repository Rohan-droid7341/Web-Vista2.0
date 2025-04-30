import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const subjects = [
  {
    id: "mathematics",
    title: "Mathematics",
    description:
      "Our mathematics quizzes are designed to strengthen your problem-solving skills and enhance your understanding of key concepts.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/138744_830259.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry"],
  },
  {
    id: "physics",
    title: "Physics",
    description:
      "The physics quiz is a journey into the laws of nature, testing your grasp of motion, energy, and the forces that govern our universe.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/953446_989058.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "A chemistry quiz is an exciting journey through the reactions and elements that shape our world.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/795623_660041.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry", "Analytical Chemistry"],
  },
  {
    id: "biology",
    title: "Biology",
    description:
      "A biology quiz invites you to dive into the wonders of life, from the tiniest cells to complex ecosystems.",
    image: "https://cdn.pixabay.com/photo/2018/09/06/18/49/bacteria-3658992_1280.jpg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy", "Evolution"],
  },
  {
    id: "history",
    title: "History",
    description:
      "A history quiz takes you on a journey through time, testing your knowledge of the events that shaped our world.",
    image: "https://i.ytimg.com/vi/F0Gkr4MBEO0/hqdefault.jpg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Ancient History", "Medieval History", "Modern History", "World Wars", "Cultural History"],
  },
  {
    id: "geography",
    title: "Geography",
    description: "A geography quiz takes you on a journey across diverse landscapes and cultures.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/71239_897290.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Physical Geography", "Human Geography", "Cartography", "Climate", "Geopolitics"],
  },
  {
    id: "economics",
    title: "Economics",
    description: "An economics quiz challenges you to explore key concepts of supply and demand and market dynamics.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/917704_462630.png",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Microeconomics", "Macroeconomics", "International Economics", "Financial Economics", "Economic History"],
  },
  {
    id: "commerce",
    title: "Commerce",
    description: "A commerce quiz tests your knowledge of the business world, from finance and trade to economics.",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/417272_716520.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Accounting", "Business Management", "Marketing", "Finance", "International Trade"],
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description:
      "A General Knowledge quiz is an exciting journey through diverse topics, testing your awareness of the world!",
    image:
      "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18018203/498405_639076.jpeg",
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    topics: ["Current Affairs", "Science & Technology", "Arts & Literature", "Sports", "Entertainment"],
  },
]

export default function SubjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Explore Subjects</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover a wide range of subjects and test your knowledge with our interactive quizzes
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="humanities">Humanities</TabsTrigger>
              <TabsTrigger value="commerce">Commerce</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="science" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects
                  .filter((subject) => ["mathematics", "physics", "chemistry", "biology"].includes(subject.id))
                  .map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="humanities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects
                  .filter((subject) => ["history", "geography"].includes(subject.id))
                  .map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="commerce" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects
                  .filter((subject) => ["economics", "commerce"].includes(subject.id))
                  .map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="general" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects
                  .filter((subject) => ["general-knowledge"].includes(subject.id))
                  .map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function SubjectCard({ subject }: { subject: (typeof subjects)[0] }) {
  return (
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
        <CardDescription className="text-base mb-4">{subject.description}</CardDescription>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Difficulty Levels:</h4>
            <div className="flex flex-wrap gap-2">
              {subject.difficulty.map((level) => (
                <span key={level} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                  {level}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {subject.topics.slice(0, 3).map((topic) => (
                <span key={topic} className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground">
                  {topic}
                </span>
              ))}
              {subject.topics.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground">
                  +{subject.topics.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/quiz/${subject.id}`} className="w-full">
          <Button className="w-full">Start Quiz</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
