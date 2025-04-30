"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { BookOpen, Award, Clock, BarChart, History } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Track your progress, take quizzes, and improve your knowledge.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-primary mr-2" />
                    <div className="text-2xl font-bold">12</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-primary mr-2" />
                    <div className="text-2xl font-bold">78%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Time Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <div className="text-2xl font-bold">5h 23m</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    <div className="text-2xl font-bold">7</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent quizzes and study sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Mathematics Quiz - Algebra",
                      date: "Today, 2:30 PM",
                      score: "85%",
                    },
                    {
                      title: "Physics Quiz - Mechanics",
                      date: "Yesterday, 4:15 PM",
                      score: "72%",
                    },
                    {
                      title: "Chemistry Quiz - Periodic Table",
                      date: "Apr 27, 2024, 10:00 AM",
                      score: "90%",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <History className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{activity.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Quizzes</CardTitle>
                  <CardDescription>Based on your interests and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Biology - Cell Structure", "History - World War II", "Geography - Countries and Capitals"].map(
                      (quiz, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{quiz}</span>
                          <Button size="sm">Start</Button>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Streak</CardTitle>
                  <CardDescription>Keep your learning momentum going</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-5xl font-bold mb-2">5</div>
                    <p className="text-muted-foreground">days in a row</p>
                    <div className="flex justify-center gap-1 mt-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div
                          key={day}
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            day <= 5 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Quizzes</CardTitle>
                <CardDescription>Quizzes you've taken and created</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Mathematics Quiz - Algebra",
                      date: "Apr 29, 2024",
                      score: "85%",
                      status: "Completed",
                    },
                    {
                      title: "Physics Quiz - Mechanics",
                      date: "Apr 28, 2024",
                      score: "72%",
                      status: "Completed",
                    },
                    {
                      title: "Chemistry Quiz - Periodic Table",
                      date: "Apr 27, 2024",
                      score: "90%",
                      status: "Completed",
                    },
                    {
                      title: "Biology Quiz - Genetics",
                      date: "N/A",
                      score: "N/A",
                      status: "Not Started",
                    },
                  ].map((quiz, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{quiz.title}</p>
                        <p className="text-sm text-muted-foreground">{quiz.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{quiz.status === "Completed" ? quiz.score : ""}</span>
                        <Button size="sm" variant={quiz.status === "Completed" ? "outline" : "default"}>
                          {quiz.status === "Completed" ? "Retake" : "Start"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
                <CardDescription>Your performance across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { subject: "Mathematics", progress: 75 },
                    { subject: "Physics", progress: 60 },
                    { subject: "Chemistry", progress: 85 },
                    { subject: "Biology", progress: 40 },
                    { subject: "History", progress: 90 },
                  ].map((subject, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{subject.subject}</span>
                        <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${subject.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges and rewards you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "First Quiz",
                      description: "Completed your first quiz",
                      unlocked: true,
                    },
                    {
                      name: "Perfect Score",
                      description: "Achieved 100% on a quiz",
                      unlocked: true,
                    },
                    {
                      name: "Math Wizard",
                      description: "Completed 10 math quizzes",
                      unlocked: true,
                    },
                    {
                      name: "Science Explorer",
                      description: "Completed quizzes in all science subjects",
                      unlocked: true,
                    },
                    {
                      name: "Quiz Marathon",
                      description: "Completed 5 quizzes in one day",
                      unlocked: true,
                    },
                    {
                      name: "Knowledge Seeker",
                      description: "Studied for 10 hours total",
                      unlocked: true,
                    },
                    {
                      name: "Consistent Learner",
                      description: "Logged in for 7 days in a row",
                      unlocked: true,
                    },
                    {
                      name: "Quiz Master",
                      description: "Completed 50 quizzes",
                      unlocked: false,
                    },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 text-center ${
                        achievement.unlocked
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/50 border-muted text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`mx-auto mb-2 h-12 w-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Award className="h-6 w-6" />
                      </div>
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      <p className="text-xs mt-1">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
