import { NextResponse } from "next/server"
import type { SectorData } from "@/lib/types"

// This would normally be calculated from the stocks data
// For demo purposes, we'll use mock data
const mockSectorData: SectorData[] = [
  {
    id: "sector-1",
    name: "Financials",
    stockCount: 2,
    totalInvestment: 32905.0,
    totalPresentValue: 34610.0,
  },
  {
    id: "sector-2",
    name: "Technology",
    stockCount: 2,
    totalInvestment: 45608.75,
    totalPresentValue: 46267.5,
  },
  {
    id: "sector-3",
    name: "Energy",
    stockCount: 1,
    totalInvestment: 12250.0,
    totalPresentValue: 12901.25,
  },
  {
    id: "sector-4",
    name: "Telecom",
    stockCount: 1,
    totalInvestment: 10209.0,
    totalPresentValue: 9963.0,
  },
]

export async function GET() {
  try {
    // In a real implementation, this would calculate sector data
    // based on the latest stock prices and portfolio holdings

    // Simulate some value fluctuations for demo purposes
    const updatedSectorData = mockSectorData.map((sector) => {
      const valueChange = sector.totalPresentValue * (Math.random() * 0.04 - 0.02)

      return {
        ...sector,
        totalPresentValue: sector.totalPresentValue + valueChange,
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedSectorData,
    })
  } catch (error) {
    console.error("Error fetching sector data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch sector data" }, { status: 500 })
  }
}
