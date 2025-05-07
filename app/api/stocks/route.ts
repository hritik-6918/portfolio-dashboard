import { NextResponse } from "next/server"
import type { Stock } from "@/lib/types"

// Mock data - in a real implementation, this would fetch from external APIs
const mockStocks: Stock[] = [
  {
    id: "1",
    name: "HDFC Bank",
    purchasePrice: 1450.75,
    quantity: 10,
    exchange: "NSE",
    currentPrice: 1520.5,
    peRatio: 22.5,
    latestEarnings: "Q2 2023: ₹11,250 Cr",
    sector: "Financials",
  },
  {
    id: "2",
    name: "Infosys",
    purchasePrice: 1320.25,
    quantity: 15,
    exchange: "NSE",
    currentPrice: 1290.75,
    peRatio: 24.8,
    latestEarnings: "Q3 2023: ₹6,586 Cr",
    sector: "Technology",
  },
  // More stocks would be added here
]

export async function GET() {
  try {
    // In a real implementation, this would:
    // 1. Fetch current prices from Yahoo Finance
    // 2. Fetch PE ratios and earnings from Google Finance
    // 3. Combine with stored portfolio data

    // Simulate some price fluctuations for demo purposes
    const updatedStocks = mockStocks.map((stock) => {
      const priceChange = stock.currentPrice * (Math.random() * 0.04 - 0.02)
      const peChange = stock.peRatio * (Math.random() * 0.06 - 0.03)

      return {
        ...stock,
        currentPrice: stock.currentPrice + priceChange,
        peRatio: stock.peRatio + peChange,
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedStocks,
    })
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stock data" }, { status: 500 })
  }
}
