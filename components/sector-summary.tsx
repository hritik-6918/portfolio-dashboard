"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { fetchSectorData } from "@/lib/api"
import type { SectorData } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { ArrowUpIcon, ArrowDownIcon, RefreshCwIcon } from "lucide-react"

export default function SectorSummary() {
  const [sectors, setSectors] = useState<SectorData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchSectorData()
      setSectors(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch sector data. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up interval for refreshing data every 15 seconds
    const intervalId = setInterval(fetchData, 15000)

    // Clean up interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  // Calculate total investment across all sectors
  const totalInvestment = sectors.reduce((sum, sector) => sum + sector.totalInvestment, 0)

  if (loading && sectors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCwIcon className="animate-spin mr-2" />
        <span>Loading sector data...</span>
      </div>
    )
  }

  if (error && sectors.length === 0) {
    return (
      <div className="text-center p-4 border border-red-300 bg-red-50 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sectors.map((sector) => {
        const gainLoss = sector.totalPresentValue - sector.totalInvestment
        const percentChange = (gainLoss / sector.totalInvestment) * 100
        const allocationPercentage = (sector.totalInvestment / totalInvestment) * 100

        return (
          <Card key={sector.id}>
            <CardHeader className="pb-2">
              <CardTitle>{sector.name}</CardTitle>
              <CardDescription>
                {sector.stockCount} stocks · {formatPercentage(allocationPercentage)} of portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Allocation</span>
                    <span>{formatPercentage(allocationPercentage)}</span>
                  </div>
                  <Progress value={allocationPercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Investment</p>
                    <p className="text-lg font-semibold">{formatCurrency(sector.totalInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Present Value</p>
                    <p className="text-lg font-semibold">{formatCurrency(sector.totalPresentValue)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Gain/Loss</p>
                  <div className={`flex items-center ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {gainLoss >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-lg font-semibold">{formatCurrency(Math.abs(gainLoss))}</span>
                    <span className="ml-2">({formatPercentage(Math.abs(percentChange))})</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
