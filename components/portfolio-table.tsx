"use client"

import { useEffect, useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchPortfolioData } from "@/lib/api"
import type { Stock } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"

export default function PortfolioTable() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchPortfolioData()
      setStocks(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError("Failed to fetch portfolio data. Please try again later.")
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

  // Calculate total investment and present value
  const totals = useMemo(() => {
    return stocks.reduce(
      (acc, stock) => {
        const investment = stock.purchasePrice * stock.quantity
        const presentValue = stock.currentPrice * stock.quantity

        return {
          totalInvestment: acc.totalInvestment + investment,
          totalPresentValue: acc.totalPresentValue + presentValue,
        }
      },
      { totalInvestment: 0, totalPresentValue: 0 },
    )
  }, [stocks])

  if (loading && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCwIcon className="animate-spin mr-2" />
        <span>Loading portfolio data...</span>
      </div>
    )
  }

  if (error && stocks.length === 0) {
    return (
      <div className="text-center p-4 border border-red-300 bg-red-50 rounded-md">
        <p className="text-red-600">{error}</p>
        <Button variant="outline" onClick={fetchData} className="mt-2">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Particulars</TableHead>
            <TableHead className="text-right">Purchase Price</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Investment</TableHead>
            <TableHead className="text-right">Portfolio (%)</TableHead>
            <TableHead>NSE/BSE</TableHead>
            <TableHead className="text-right">CMP</TableHead>
            <TableHead className="text-right">Present Value</TableHead>
            <TableHead className="text-right">Gain/Loss</TableHead>
            <TableHead className="text-right">P/E Ratio</TableHead>
            <TableHead>Latest Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => {
            const investment = stock.purchasePrice * stock.quantity
            const presentValue = stock.currentPrice * stock.quantity
            const gainLoss = presentValue - investment
            const portfolioPercentage = (investment / totals.totalInvestment) * 100

            return (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(stock.purchasePrice)}</TableCell>
                <TableCell className="text-right">{stock.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(investment)}</TableCell>
                <TableCell className="text-right">{formatPercentage(portfolioPercentage)}</TableCell>
                <TableCell>{stock.exchange}</TableCell>
                <TableCell className="text-right">{formatCurrency(stock.currentPrice)}</TableCell>
                <TableCell className="text-right">{formatCurrency(presentValue)}</TableCell>
                <TableCell className={`text-right ${gainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <div className="flex items-center justify-end">
                    {gainLoss >= 0 ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {formatCurrency(Math.abs(gainLoss))}
                  </div>
                </TableCell>
                <TableCell className="text-right">{stock.peRatio.toFixed(2)}</TableCell>
                <TableCell>{stock.latestEarnings}</TableCell>
              </TableRow>
            )
          })}

          {/* Summary row */}
          <TableRow className="bg-muted/50 font-medium">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{formatCurrency(totals.totalInvestment)}</TableCell>
            <TableCell className="text-right">100%</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right">{formatCurrency(totals.totalPresentValue)}</TableCell>
            <TableCell
              className={`text-right ${totals.totalPresentValue - totals.totalInvestment >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              <div className="flex items-center justify-end">
                {totals.totalPresentValue - totals.totalInvestment >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {formatCurrency(Math.abs(totals.totalPresentValue - totals.totalInvestment))}
              </div>
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
