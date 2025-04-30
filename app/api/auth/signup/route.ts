import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, mobile, gender, role, education, password } = body

    // Validate required fields
    if (!fullName || !email || !mobile || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, this would create a user in the database
    // For now, we'll simulate a successful registration

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a mock user object
    return NextResponse.json({
      id: "1",
      name: fullName,
      email,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
