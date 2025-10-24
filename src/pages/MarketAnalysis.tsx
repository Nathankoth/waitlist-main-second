import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const marketData = [
  { month: "Jan", price: 450000, volume: 120 },
  { month: "Feb", price: 465000, volume: 135 },
  { month: "Mar", price: 478000, volume: 145 },
  { month: "Apr", price: 485000, volume: 160 },
  { month: "May", price: 492000, volume: 155 },
  { month: "Jun", price: 501000, volume: 170 },
]

const newsItems = [
  {
    title: "Real Estate Market Shows Strong Growth",
    summary: "The housing market continues to show resilience with a 2.4% increase this quarter.",
    time: "2 hours ago"
  },
  {
    title: "New Development Projects Announced",
    summary: "Three major residential projects announced in the downtown area.",
    time: "4 hours ago"
  },
  {
    title: "Interest Rates Remain Stable",
    summary: "Federal Reserve maintains current interest rates, supporting housing demand.",
    time: "1 day ago"
  }
]

const MarketAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Market Analysis</h1>
          <p className="text-muted-foreground">Latest trends & insights</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Average Property Prices</CardTitle>
              <CardDescription>Monthly trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Price']} />
                  <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales Volume</CardTitle>
              <CardDescription>Number of properties sold monthly</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Real Estate News</CardTitle>
            <CardDescription>Latest updates from the market</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
                  <p className="text-xs text-muted-foreground mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default MarketAnalysis