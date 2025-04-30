import { NextResponse } from "next/server"

// In a real app, this would be stored in a database
const otpStore: Record<string, { otp: string; expiresAt: number }> = {}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 10-minute expiry
    otpStore[email] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    }

    // In a real app, you would send an email with the OTP
    console.log(`OTP for ${email}: ${otp}`)

    return NextResponse.json({
      message: "OTP sent successfully",
      // For demo purposes only, we're returning the OTP
      // In a real app, you would never return the OTP in the response
      otp,
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { email, otp } = body

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    const storedOtp = otpStore[email]

    if (!storedOtp) {
      return NextResponse.json({ error: "No OTP found for this email" }, { status: 400 })
    }

    if (storedOtp.expiresAt < Date.now()) {
      delete otpStore[email]
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (storedOtp.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP is valid, clean up
    delete otpStore[email]

    return NextResponse.json({
      message: "OTP verified successfully",
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
