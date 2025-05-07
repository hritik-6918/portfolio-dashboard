export interface Stock {
  id: string
  name: string
  purchasePrice: number
  quantity: number
  exchange: string
  currentPrice: number
  peRatio: number
  latestEarnings: string
  sector: string
}

export interface SectorData {
  id: string
  name: string
  stockCount: number
  totalInvestment: number
  totalPresentValue: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}
