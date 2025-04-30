import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BookOpen, Video, FileText, CuboidIcon as Cube, Bot, GraduationCap } from "lucide-react"

const subjects = [
  {
    name: "History",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Video Lectures",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "https://youtu.be/PtCi8OmNHGs?si=zxoxGhHBh1hg-V5N",
      },
      {
        name: "PDF Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "https://www.drishtiias.com/images/pdf/sr.%20secondary%20history.pdf",
      },
      {
        name: "3D Historical Models",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "https://sketchfab.com/categories/cultural-heritage-history",
      },
      {
        name: "AI Study Assistant",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "#",
        premium: true,
      },
      {
        name: "Connect with History Mentor",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "#",
        premium: true,
      },
    ],
  },
  {
    name: "Mathematics",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Math Video Tutorials",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "https://youtu.be/JbhBdOfMEPs?si=Fpz3ljYtzTPLO07o",
      },
      {
        name: "Formula Sheets & Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "https://www.studocu.com/in/document/allen-career-institute/jee-main-advance/mathematics-formula-booklet/65492816",
      },
      {
        name: "3D Geometric Visualizations",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "https://byjus.com/maths/visualising-solid-shapes/",
      },
      {
        name: "Math Problem Solver AI",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "#",
        premium: true,
      },
      {
        name: "Math Tutor Support",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "#",
        premium: true,
      },
    ],
  },
  {
    name: "Biology",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Biology Lectures",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "https://youtu.be/3w1fY67dnFI?si=QDrSnQuTB5yLeZJj",
      },
      {
        name: "Biology Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "https://www.researchgate.net/publication/348327156_Biology_Notes",
      },
      {
        name: "3D Cell Models",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "https://www.allencell.org/3d-cell-viewer.html",
      },
      {
        name: "Biology AI Helper",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "#",
        premium: true,
      },
      {
        name: "Biology Expert Support",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "#",
        premium: true,
      },
    ],
  },
  {
    name: "Chemistry",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Chemistry Video Labs",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "#",
      },
      {
        name: "Chemistry Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "#",
      },
      {
        name: "3D Molecular Structures",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "#",
      },
      {
        name: "Chemistry AI Support",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "#",
        premium: true,
      },
      {
        name: "Chemistry Mentor",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "#",
        premium: true,
      },
    ],
  },
  {
    name: "Physics",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Physics Lectures",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "#",
      },
      {
        name: "Physics Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "#",
      },
      {
        name: "3D Physics Simulations",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "#",
      },
      {
        name: "Physics Problem Solver",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "#",
        premium: true,
      },
      {
        name: "Physics Tutor",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "#",
        premium: true,
      },
    ],
  },
  {
    name: "Geography",
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    resources: [
      {
        name: "Geography Video Tutorials",
        icon: <Video className="h-4 w-4 text-primary" />,
        link: "https://youtube.com/playlist?list=PLECwYPZIUTnr-ZMwhX8b-Fe8Nl-tjXvsI&si=wt-DKI92nePn-jK8",
      },
      {
        name: "Geography Notes",
        icon: <FileText className="h-4 w-4 text-red-500" />,
        link: "https://education.nationalgeographic.org/resource/geography-article/",
      },
      {
        name: "3D Earth Models",
        icon: <Cube className="h-4 w-4 text-blue-500" />,
        link: "https://solarsystem.nasa.gov/gltf_embed/2393/",
      },
      {
        name: "Geography AI Guide",
        icon: <Bot className="h-4 w-4 text-yellow-500" />,
        link: "https://www.geography.ai",
        premium: true,
      },
      {
        name: "Geography Mentor",
        icon: <GraduationCap className="h-4 w-4 text-green-500" />,
        link: "https://iasmentorship.com/geography/",
        premium: true,
      },
    ],
  },
]

export default function StudyMaterialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Study Materials</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access comprehensive study resources across various subjects to enhance your learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  {subject.icon}
                  <CardTitle>{subject.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {subject.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex}>
                        <Link
                          href={resource.link}
                          className={`flex items-center gap-2 hover:text-primary transition-colors ${
                            resource.premium ? "text-muted-foreground" : ""
                          }`}
                          target="_blank"
                        >
                          {resource.icon}
                          <span>{resource.name}</span>
                          {resource.premium && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-auto">
                              Premium
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Resources?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Upgrade to our premium plan to access exclusive study materials, AI-powered assistance, and personalized
              mentoring.
            </p>
            <Link href="/premium">
              <Button size="lg">Explore Premium Plans</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
