import PortfolioTable from "@/components/portfolio-table"
import SectorSummary from "@/components/sector-summary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="portfolio">Portfolio View</TabsTrigger>
          <TabsTrigger value="sectors">Sector Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Holdings</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Live data updates every 15 seconds. Last updated:{" "}
              <span id="last-updated">{new Date().toLocaleTimeString()}</span>
            </p>
            <PortfolioTable />
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sector Analysis</h2>
            <SectorSummary />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
