import type { Stock, SectorData } from "./types"

// Mock data for development - would be replaced with actual API calls
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
  {
    id: "3",
    name: "Reliance Industries",
    purchasePrice: 2450.0,
    quantity: 5,
    exchange: "BSE",
    currentPrice: 2580.25,
    peRatio: 19.2,
    latestEarnings: "Q2 2023: ₹19,300 Cr",
    sector: "Energy",
  },
  {
    id: "4",
    name: "TCS",
    purchasePrice: 3200.5,
    quantity: 8,
    exchange: "NSE",
    currentPrice: 3350.75,
    peRatio: 27.3,
    latestEarnings: "Q3 2023: ₹11,342 Cr",
    sector: "Technology",
  },
  {
    id: "5",
    name: "ICICI Bank",
    purchasePrice: 920.25,
    quantity: 20,
    exchange: "NSE",
    currentPrice: 975.5,
    peRatio: 18.7,
    latestEarnings: "Q2 2023: ₹8,312 Cr",
    sector: "Financials",
  },
  {
    id: "6",
    name: "Bharti Airtel",
    purchasePrice: 850.75,
    quantity: 12,
    exchange: "BSE",
    currentPrice: 830.25,
    peRatio: 32.1,
    latestEarnings: "Q1 2023: ₹2,465 Cr",
    sector: "Telecom",
  },
]

// Function to simulate API call to Yahoo Finance for stock prices
async function fetchYahooFinanceData(symbols: string[]): Promise<Record<string, number>> {
  // In a real implementation, this would make an API call to Yahoo Finance
  // or use a scraping solution

  // For demo purposes, we'll simulate price fluctuations
  const priceData: Record<string, number> = {}

  mockStocks.forEach((stock) => {
    // Simulate price fluctuation of ±2%
    const fluctuation = stock.currentPrice * (Math.random() * 0.04 - 0.02)
    priceData[stock.name] = stock.currentPrice + fluctuation
  })

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return priceData
}

// Function to simulate API call to Google Finance for PE ratios and earnings
async function fetchGoogleFinanceData(
  symbols: string[],
): Promise<Record<string, { peRatio: number; latestEarnings: string }>> {
  // In a real implementation, this would make an API call to Google Finance
  // or use a scraping solution

  // For demo purposes, we'll return static data with minor variations
  const financeData: Record<string, { peRatio: number; latestEarnings: string }> = {}

  mockStocks.forEach((stock) => {
    // Simulate small PE ratio changes
    const peVariation = stock.peRatio * (Math.random() * 0.06 - 0.03)

    financeData[stock.name] = {
      peRatio: stock.peRatio + peVariation,
      latestEarnings: stock.latestEarnings,
    }
  })

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return financeData
}

// Main function to fetch portfolio data
export async function fetchPortfolioData(): Promise<Stock[]> {
  try {
    // Get stock symbols
    const symbols = mockStocks.map((stock) => stock.name)

    // Fetch data from both sources in parallel
    const [yahooData, googleData] = await Promise.all([fetchYahooFinanceData(symbols), fetchGoogleFinanceData(symbols)])

    // Update mock data with fetched values
    const updatedStocks = mockStocks.map((stock) => ({
      ...stock,
      currentPrice: yahooData[stock.name] || stock.currentPrice,
      peRatio: googleData[stock.name]?.peRatio || stock.peRatio,
      latestEarnings: googleData[stock.name]?.latestEarnings || stock.latestEarnings,
    }))

    return updatedStocks
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    throw new Error("Failed to fetch portfolio data")
  }
}

// Function to fetch sector data
export async function fetchSectorData(): Promise<SectorData[]> {
  try {
    // First get the updated stock data
    const stocks = await fetchPortfolioData()

    // Group stocks by sector
    const sectorMap = new Map<string, Stock[]>()

    stocks.forEach((stock) => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, [])
      }
      sectorMap.get(stock.sector)!.push(stock)
    })

    // Calculate sector summaries
    const sectorData: SectorData[] = Array.from(sectorMap.entries()).map(([sectorName, sectorStocks], index) => {
      const totalInvestment = sectorStocks.reduce((sum, stock) => sum + stock.purchasePrice * stock.quantity, 0)

      const totalPresentValue = sectorStocks.reduce((sum, stock) => sum + stock.currentPrice * stock.quantity, 0)

      return {
        id: `sector-${index + 1}`,
        name: sectorName,
        stockCount: sectorStocks.length,
        totalInvestment,
        totalPresentValue,
      }
    })

    return sectorData
  } catch (error) {
    console.error("Error fetching sector data:", error)
    throw new Error("Failed to fetch sector data")
  }
}

// In a real implementation, you would add functions to:
// 1. Fetch real data from Yahoo Finance (using an unofficial API or scraping)
// 2. Fetch real data from Google Finance (using an unofficial API or scraping)
// 3. Handle rate limiting, caching, and error cases
