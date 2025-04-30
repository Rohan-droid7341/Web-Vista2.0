import { NextResponse } from "next/server"

// In a real app, this would be stored in a database
const quizResults: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, quizId, score, answers, timeSpent } = body

    if (!userId || !quizId || score === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = {
      id: `result_${Date.now()}`,
      userId,
      quizId,
      score,
      answers: answers || [],
      timeSpent: timeSpent || 0,
      completedAt: new Date().toISOString(),
    }

    quizResults.push(result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Save quiz result error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const quizId = searchParams.get("quizId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let results = quizResults.filter((result) => result.userId === userId)

    if (quizId) {
      results = results.filter((result) => result.quizId === quizId)
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Get quiz results error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
