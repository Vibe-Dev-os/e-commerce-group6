import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      customerInfo,
      shippingAddress,
      items,
      paymentMethod,
      subtotal,
      shipping,
      total,
    } = body

    // Validate required fields
    if (!customerInfo || !shippingAddress || !items || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Determine initial payment and order status based on payment method
    let paymentStatus: "pending" | "paid" | "failed" = "pending"
    let orderStatus: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled" = "processing"

    // COD orders are pending payment until delivery
    if (paymentMethod === "cod") {
      paymentStatus = "pending"
      orderStatus = "confirmed"
    }

    // Connect to database
    await connectDB()

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create the order
    const order = await Order.create({
      orderNumber,
      customerInfo,
      shippingAddress,
      items,
      paymentMethod,
      paymentStatus,
      orderStatus,
      subtotal,
      shipping,
      total,
    })

    // Return different responses based on payment method
    let responseData: any = {
      success: true,
      order: {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        total: order.total,
        paymentMethod: order.paymentMethod,
      },
    }

    // Add payment instructions based on method
    if (paymentMethod === "bank") {
      responseData.paymentInstructions = {
        type: "bank_transfer",
        bankName: "BDO Unibank",
        accountName: "ACME Gaming Store",
        accountNumber: "1234-5678-9012",
        amount: total,
        reference: order.orderNumber,
        instructions: "Please send proof of payment to orders@acmestore.com with your order number.",
      }
    } else if (paymentMethod === "gcash") {
      responseData.paymentInstructions = {
        type: "gcash",
        gcashNumber: "0917-123-4567",
        accountName: "ACME Gaming Store",
        amount: total,
        reference: order.orderNumber,
        instructions: "Send payment via GCash and screenshot the confirmation. Send to orders@acmestore.com with your order number.",
      }
    } else if (paymentMethod === "cod") {
      responseData.paymentInstructions = {
        type: "cash_on_delivery",
        amount: total,
        instructions: "Please prepare the exact amount. Our delivery rider will collect payment upon delivery.",
      }
    }

    return NextResponse.json(responseData, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
