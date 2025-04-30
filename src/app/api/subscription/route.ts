import { NextResponse } from "next/server"

// In a real app, this would be stored in a database
const subscriptions: Record<string, { userId: string; plan: string; startDate: string; endDate: string }> = {}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, plan, billingCycle } = body

    if (!userId || !plan || !billingCycle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const startDate = new Date()
    const endDate = new Date()

    // Set end date based on billing cycle
    if (billingCycle === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1)
    } else if (billingCycle === "annual") {
      endDate.setFullYear(endDate.getFullYear() + 1)
    } else {
      return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 })
    }

    const subscription = {
      userId,
      plan,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }

    subscriptions[userId] = subscription

    return NextResponse.json({
      success: true,
      subscription,
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const subscription = subscriptions[userId]

    if (!subscription) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 })
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
