"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertCircle, Clock, Trophy, ArrowRight, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useToast } from "@/hooks/use-toast"


interface UserData {
  id: string | number; // Or whatever unique ID your backend provides
  email: string;
  fullName: string;
  // Add other relevant fields like role, profilePictureUrl, etc.
}


// Mock quiz data - in a real app, this would come from the backend
const quizData = {
  mathematics: {
    beginner: {
      title: "Mathematics Quiz - Beginner",
      description: "Test your basic mathematics knowledge",
      questions: [
        {
          id: "q1",
          text: "What is 5 + 7?",
          options: ["10", "12", "15", "11"],
          correctAnswer: 1,
          explanation: "5 + 7 = 12",
        },
        {
          id: "q2",
          text: "What is 8 × 9?",
          options: ["63", "72", "81", "64"],
          correctAnswer: 2,
          explanation: "8 × 9 = 72",
        },
        {
          id: "q3",
          text: "What is 20 - 7?",
          options: ["13", "14", "12", "15"],
          correctAnswer: 0,
          explanation: "20 - 7 = 13",
        },
        {
          id: "q4",
          text: "What is 36 ÷ 4?",
          options: ["8", "9", "7", "10"],
          correctAnswer: 1,
          explanation: "36 ÷ 4 = 9",
        },
        {
          id: "q5",
          text: "What is 3² + 4²?",
          options: ["25", "7", "49", "16"],
          correctAnswer: 0,
          explanation: "3² + 4² = 9 + 16 = 25",
        },
      ],
    },
    intermediate: {
      title: "Mathematics Quiz - Intermediate",
      description: "Challenge your mathematical skills",
      questions: [
        {
          id: "q1",
          text: "Solve for x: 2x + 5 = 15",
          options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
          correctAnswer: 0,
          explanation: "2x + 5 = 15\n2x = 10\nx = 5",
        },
        {
          id: "q2",
          text: "What is the value of √49 + √16?",
          options: ["11", "13", "√65", "65"],
          correctAnswer: 1,
          explanation: "√49 + √16 = 7 + 4 = 11",
        },
        {
          id: "q3",
          text: "If f(x) = 3x² - 2, what is f(2)?",
          options: ["10", "12", "14", "16"],
          correctAnswer: 0,
          explanation: "f(2) = 3(2)² - 2 = 3(4) - 2 = 12 - 2 = 10",
        },
        {
          id: "q4",
          text: "What is the area of a circle with radius 5 units?",
          options: ["25π square units", "10π square units", "5π square units", "15π square units"],
          correctAnswer: 0,
          explanation: "Area of a circle = πr² = π(5)² = 25π square units",
        },
        {
          id: "q5",
          text: "What is the slope of the line passing through points (2,3) and (4,7)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: 1,
          explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2",
        },
      ],
    },
    advanced: {
      title: "Mathematics Quiz - Advanced",
      description: "Test your advanced mathematical knowledge",
      questions: [
        {
          id: "q1",
          text: "What is the derivative of f(x) = x³ - 4x² + 2x - 5?",
          options: ["f'(x) = 3x² - 8x + 2", "f'(x) = 3x² - 4x + 2", "f'(x) = 3x² - 8x - 5", "f'(x) = x² - 8x + 2"],
          correctAnswer: 0,
          explanation: "f'(x) = 3x² - 8x + 2",
        },
        {
          id: "q2",
          text: "Solve the equation: log₂(x) + log₂(x-3) = 3",
          options: ["x = 4", "x = 5", "x = 6", "x = 7"],
          correctAnswer: 1,
          explanation:
            "log₂(x) + log₂(x-3) = 3\nlog₂(x(x-3)) = 3\nx(x-3) = 2³\nx² - 3x = 8\nx² - 3x - 8 = 0\n(x-4)(x+1) = 0\nx = 4 or x = -1\nSince x-3 must be positive, x = 4",
        },
        {
          id: "q3",
          text: "What is the value of ∫₀¹ (2x + 3) dx?",
          options: ["4", "5", "6", "7"],
          correctAnswer: 0,
          explanation: "∫₀¹ (2x + 3) dx = [x² + 3x]₀¹ = (1² + 3(1)) - (0² + 3(0)) = 1 + 3 - 0 = 4",
        },
        {
          id: "q4",
          text: "If z = 3 + 4i, what is |z|?",
          options: ["5", "7", "25", "1"],
          correctAnswer: 0,
          explanation: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5",
        },
        {
          id: "q5",
          text: "What is the solution to the system of equations: 2x + y = 7 and 3x - 2y = 8?",
          options: ["x = 3, y = 1", "x = 4, y = -1", "x = 2, y = 3", "x = 1, y = 5"],
          correctAnswer: 0,
          explanation:
            "From 2x + y = 7, we get y = 7 - 2x\nSubstituting into 3x - 2y = 8:\n3x - 2(7 - 2x) = 8\n3x - 14 + 4x = 8\n7x = 22\nx = 22/7 = 3.14...\nTherefore, y = 7 - 2(3) = 7 - 6 = 1",
        },
      ],
    },
  },
  physics: {
    beginner: {
      title: "Physics Quiz - Beginner",
      description: "Test your basic physics knowledge",
      questions: [
        {
          id: "q1",
          text: "What is the SI unit of force?",
          options: ["Watt", "Joule", "Newton", "Pascal"],
          correctAnswer: 2,
          explanation: "The SI unit of force is the Newton (N).",
        },
        {
          id: "q2",
          text: "Which of the following is a vector quantity?",
          options: ["Mass", "Temperature", "Time", "Velocity"],
          correctAnswer: 3,
          explanation: "Velocity is a vector quantity as it has both magnitude and direction.",
        },
        {
          id: "q3",
          text: "What is the formula for calculating work?",
          options: ["W = m × g", "W = F × d", "W = m × v²", "W = F / d"],
          correctAnswer: 1,
          explanation:
            "Work (W) is calculated as force (F) multiplied by displacement (d) in the direction of the force.",
        },
        {
          id: "q4",
          text: "Which law of motion states that 'For every action, there is an equal and opposite reaction'?",
          options: ["First law", "Second law", "Third law", "Fourth law"],
          correctAnswer: 2,
          explanation:
            "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction.",
        },
        {
          id: "q5",
          text: "What is the SI unit of electric current?",
          options: ["Volt", "Watt", "Ampere", "Ohm"],
          correctAnswer: 2,
          explanation: "The SI unit of electric current is the Ampere (A).",
        },
      ],
    },
    intermediate: {
      title: "Physics Quiz - Intermediate",
      description: "Challenge your physics knowledge",
      questions: [
        {
          id: "q1",
          text: "What is the formula for kinetic energy?",
          options: ["KE = mgh", "KE = ½mv²", "KE = Fd", "KE = P/t"],
          correctAnswer: 1,
          explanation: "The formula for kinetic energy is KE = ½mv², where m is mass and v is velocity.",
        },
        {
          id: "q2",
          text: "Which principle states that the total pressure in a fluid at rest is the same at all points if they are at the same height?",
          options: ["Archimedes' Principle", "Pascal's Principle", "Bernoulli's Principle", "Boyle's Law"],
          correctAnswer: 1,
          explanation:
            "Pascal's Principle states that pressure applied to an enclosed fluid is transmitted undiminished to all parts of the fluid and to the walls of the container.",
        },
        {
          id: "q3",
          text: "What is the relationship between frequency (f) and wavelength (λ) of a wave?",
          options: ["f = λ/v", "f = v/λ", "f = vλ", "f = v²/λ"],
          correctAnswer: 1,
          explanation: "The relationship between frequency and wavelength is f = v/λ, where v is the wave velocity.",
        },
        {
          id: "q4",
          text: "What is the equivalent resistance of two resistors R₁ and R₂ connected in parallel?",
          options: ["R = R₁ + R₂", "R = R₁ × R₂", "R = (R₁ × R₂)/(R₁ + R₂)", "R = 1/(1/R₁ + 1/R₂)"],
          correctAnswer: 3,
          explanation:
            "For resistors in parallel, the equivalent resistance is given by 1/R = 1/R₁ + 1/R₂, which can be rewritten as R = (R₁ × R₂)/(R₁ + R₂).",
        },
        {
          id: "q5",
          text: "What is the formula for calculating momentum?",
          options: ["p = m/v", "p = m × v", "p = m × v²", "p = m × a"],
          correctAnswer: 1,
          explanation: "Momentum (p) is calculated as mass (m) multiplied by velocity (v).",
        },
      ],
    },
  },
  chemistry: {
    beginner: {
      title: "Chemistry Quiz - Beginner",
      description: "Test your basic chemistry knowledge",
      questions: [
        {
          id: "q1",
          text: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2,
          explanation: "The chemical symbol for gold is Au, from its Latin name 'Aurum'.",
        },
        {
          id: "q2",
          text: "Which of the following is a noble gas?",
          options: ["Oxygen", "Nitrogen", "Helium", "Hydrogen"],
          correctAnswer: 2,
          explanation: "Helium (He) is a noble gas, located in Group 18 of the periodic table.",
        },
        {
          id: "q3",
          text: "What is the pH of a neutral solution?",
          options: ["0", "7", "14", "1"],
          correctAnswer: 1,
          explanation: "A neutral solution has a pH of 7.",
        },
        {
          id: "q4",
          text: "Which of the following is an example of a chemical change?",
          options: ["Melting of ice", "Dissolving sugar in water", "Rusting of iron", "Evaporation of water"],
          correctAnswer: 2,
          explanation:
            "Rusting of iron is a chemical change as it involves the formation of a new substance (iron oxide).",
        },
        {
          id: "q5",
          text: "What is the most abundant element in the Earth's crust?",
          options: ["Iron", "Silicon", "Oxygen", "Carbon"],
          correctAnswer: 2,
          explanation: "Oxygen is the most abundant element in the Earth's crust, making up about 46% by mass.",
        },
      ],
    },
  },
  biology: {
    beginner: {
      title: "Biology Quiz - Beginner",
      description: "Test your basic biology knowledge",
      questions: [
        {
          id: "q1",
          text: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
          correctAnswer: 1,
          explanation:
            "Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell's supply of ATP, which is used as a source of chemical energy.",
        },
        {
          id: "q2",
          text: "Which of the following is NOT a function of the skeletal system?",
          options: ["Support", "Protection", "Movement", "Digestion"],
          correctAnswer: 3,
          explanation: "Digestion is a function of the digestive system, not the skeletal system.",
        },
        {
          id: "q3",
          text: "What is the largest organ in the human body?",
          options: ["Heart", "Liver", "Skin", "Brain"],
          correctAnswer: 2,
          explanation: "The skin is the largest organ in the human body.",
        },
        {
          id: "q4",
          text: "Which of the following is responsible for carrying oxygen in the blood?",
          options: ["White blood cells", "Platelets", "Red blood cells", "Plasma"],
          correctAnswer: 2,
          explanation:
            "Red blood cells (erythrocytes) contain hemoglobin, which binds to oxygen and transports it throughout the body.",
        },
        {
          id: "q5",
          text: "What is the process by which plants make their own food using sunlight?",
          options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
          correctAnswer: 1,
          explanation:
            "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.",
        },
      ],
    },
  },
  history: {
    beginner: {
      title: "History Quiz - Beginner",
      description: "Test your basic history knowledge",
      questions: [
        {
          id: "q1",
          text: "Who was the first President of the United States?",
          options: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"],
          correctAnswer: 2,
          explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
        },
        {
          id: "q2",
          text: "In which year did World War II end?",
          options: ["1943", "1945", "1947", "1950"],
          correctAnswer: 1,
          explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
        },
        {
          id: "q3",
          text: "Which ancient civilization built the pyramids at Giza?",
          options: ["Mesopotamians", "Greeks", "Romans", "Egyptians"],
          correctAnswer: 3,
          explanation:
            "The ancient Egyptians built the pyramids at Giza, with the Great Pyramid being constructed around 2560 BCE.",
        },
        {
          id: "q4",
          text: "Who wrote the 'I Have a Dream' speech?",
          options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Barack Obama"],
          correctAnswer: 1,
          explanation:
            "Martin Luther King Jr. delivered his famous 'I Have a Dream' speech during the March on Washington for Jobs and Freedom on August 28, 1963.",
        },
        {
          id: "q5",
          text: "Which event marked the beginning of World War I?",
          options: [
            "The assassination of Archduke Franz Ferdinand",
            "The invasion of Poland",
            "The bombing of Pearl Harbor",
            "The Russian Revolution",
          ],
          correctAnswer: 0,
          explanation:
            "The assassination of Archduke Franz Ferdinand of Austria on June 28, 1914, is considered the event that triggered World War I.",
        },
      ],
    },
  },
  geography: {
    beginner: {
      title: "Geography Quiz - Beginner",
      description: "Test your basic geography knowledge",
      questions: [
        {
          id: "q1",
          text: "Which is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: 3,
          explanation:
            "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth's surface.",
        },
        {
          id: "q2",
          text: "Which country has the largest population in the world?",
          options: ["India", "United States", "China", "Russia"],
          correctAnswer: 2,
          explanation: "China has the largest population in the world, with over 1.4 billion people.",
        },
        {
          id: "q3",
          text: "What is the capital city of Australia?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          correctAnswer: 2,
          explanation: "Canberra is the capital city of Australia.",
        },
        {
          id: "q4",
          text: "Which mountain range separates Europe from Asia?",
          options: ["Alps", "Himalayas", "Andes", "Ural Mountains"],
          correctAnswer: 3,
          explanation: "The Ural Mountains form a natural boundary between Europe and Asia.",
        },
        {
          id: "q5",
          text: "Which river is the longest in the world?",
          options: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"],
          correctAnswer: 1,
          explanation:
            "The Nile River is generally considered to be the longest river in the world, with a length of about 6,650 kilometers (4,130 miles).",
        },
      ],
    },
  },
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const [difficulty, setDifficulty] = useState("beginner")
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  

  const subject = params.subject as string

  // Authentication Check and User Data Retrieval
    useEffect(() => {
      const storedUser = sessionStorage.getItem('loggedInUser');
      if (storedUser) {
        try {
          const userData: UserData = JSON.parse(storedUser);
          if (userData && userData.email && userData.fullName) {
            setCurrentUser(userData);
          } else {
            router.push('/login'); // Invalid user data
          }
        } catch (error) {
          console.error("Failed to parse user data from sessionStorage", error);
          router.push('/login'); // Error parsing, redirect
        }
      } else {
        router.push('/login'); // No user found, redirect
      }
      setIsLoadingUser(false);
    }, [router]);

  useEffect(() => {
    if (subject && quizData[subject as keyof typeof quizData]) {
      const subjectQuizzes = quizData[subject as keyof typeof quizData]
      if (subjectQuizzes[difficulty as keyof typeof subjectQuizzes]) {
        setCurrentQuiz(subjectQuizzes[difficulty as keyof typeof subjectQuizzes])
      } else {
        // If the selected difficulty doesn't exist, default to the first available
        const availableDifficulties = Object.keys(subjectQuizzes)
        if (availableDifficulties.length > 0) {
          setDifficulty(availableDifficulties[0])
          setCurrentQuiz(subjectQuizzes[availableDifficulties[0] as keyof typeof subjectQuizzes])
        }
      }
    }
  }, [subject, difficulty])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && quizStarted && !quizCompleted) {
      // Time's up - auto submit
      handleQuizSubmit()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timeRemaining, timerActive, quizStarted, quizCompleted])

  const startQuiz = () => {
    setQuizStarted(true)
    setTimerActive(true)
    setSelectedAnswers(Array(currentQuiz.questions.length).fill(-1))
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleQuizSubmit = () => {
    setTimerActive(false)
    setQuizCompleted(true)

    // Calculate score
    let correctAnswers = 0
    currentQuiz.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const calculatedScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100)
    setScore(calculatedScore)
    setShowResults(true)

    // In a real app, you would send the results to the backend here
    toast({
      title: "Quiz completed!",
      description: `You scored ${calculatedScore}%`,
    })
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers([])
    setQuizStarted(false)
    setQuizCompleted(false)
    setTimeRemaining(300)
    setTimerActive(false)
    setShowResults(false)
    setScore(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!currentQuiz) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
            <p className="text-muted-foreground mb-6">The requested quiz could not be found.</p>
            <Button onClick={() => router.push("/subjects")}>Browse Subjects</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{currentQuiz.title}</h1>
          <p className="text-muted-foreground">{currentQuiz.description}</p>
        </div>

        {!quizStarted ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to start?</CardTitle>
              <CardDescription>
                This quiz contains {currentQuiz.questions.length} questions. You will have 5 minutes to complete it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Select Difficulty:</h3>
                  <Tabs value={difficulty} onValueChange={setDifficulty} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full">
                      {Object.keys(quizData[subject as keyof typeof quizData]).map((diff) => (
                        <TabsTrigger key={diff} value={diff} disabled={quizStarted}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Once you start the quiz, the timer will begin. You can navigate between questions, but you must
                    complete the quiz within the time limit.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startQuiz} className="w-full">
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto">
            {!showResults ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className={`text-sm font-medium ${timeRemaining < 60 ? "text-red-500" : ""}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>
                  <Progress value={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100} className="h-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-4">{currentQuiz.questions[currentQuestionIndex].text}</h3>
                      <RadioGroup
                        value={selectedAnswers[currentQuestionIndex]?.toString()}
                        onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
                        className="space-y-3"
                      >
                        {currentQuiz.questions[currentQuestionIndex].options.map((option: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                    <Button onClick={goToNextQuestion}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Results</CardTitle>
                  <CardDescription>You completed the quiz in {formatTime(300 - timeRemaining)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-primary/10 mb-4">
                        <Trophy className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Your Score: {score}%</h3>
                      <p className="text-muted-foreground">
                        {score >= 80 ? "Excellent work!" : score >= 60 ? "Good job!" : "Keep practicing!"}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Question Review:</h4>
                      {currentQuiz.questions.map((question: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3 mb-2">
                            {selectedAnswers[index] === question.correctAnswer ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium">{question.text}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your answer:{" "}
                                {selectedAnswers[index] >= 0
                                  ? question.options[selectedAnswers[index]]
                                  : "Not answered"}
                              </p>
                              <p className="text-sm text-green-600 mt-1">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                              {selectedAnswers[index] !== question.correctAnswer && (
                                <p className="text-sm mt-2 bg-muted p-2 rounded">{question.explanation}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetQuiz}>
                    Try Again
                  </Button>
                  <Button onClick={() => router.push("/subjects")}>Back to Subjects</Button>
                </CardFooter>
              </Card>
            )}

            <Dialog open={quizCompleted && !showResults} onOpenChange={setShowResults}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quiz Completed!</DialogTitle>
                  <DialogDescription>
                    You've answered all the questions. Would you like to see your results?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center text-2xl font-bold">Your Score: {score}%</p>
                </div>
                <DialogFooter>
                  <Button onClick={() => setShowResults(true)}>View Detailed Results</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
