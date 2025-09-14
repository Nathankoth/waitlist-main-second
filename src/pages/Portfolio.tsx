import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, MapPin, DollarSign, Percent, Calendar } from "lucide-react"

const portfolioStats = {
  totalValue: "$2,450,000",
  totalReturn: "+18.5%",
  monthlyIncome: "$12,400",
  properties: 5
}

const properties = [
  {
    id: 1,
    name: "Downtown Apartment Complex",
    location: "New York, NY",
    type: "Residential",
    purchasePrice: "$800,000",
    currentValue: "$950,000",
    monthlyIncome: "$6,200",
    roi: "+18.8%",
    status: "Performing"
  },
  {
    id: 2,
    name: "Commercial Office Building",
    location: "San Francisco, CA",
    type: "Commercial",
    purchasePrice: "$1,200,000",
    currentValue: "$1,380,000",
    monthlyIncome: "$4,800",
    roi: "+15.0%",
    status: "Performing"
  },
  {
    id: 3,
    name: "Vacation Rental Property",
    location: "Miami, FL",
    type: "Vacation Rental",
    purchasePrice: "$450,000",
    currentValue: "$520,000",
    monthlyIncome: "$1,400",
    roi: "+15.6%",
    status: "Needs Attention"
  }
]

const Portfolio = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Your Portfolio</h1>
          <p className="text-muted-foreground">Track your investments</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioStats.totalValue}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{portfolioStats.totalReturn}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioStats.monthlyIncome}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Properties</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioStats.properties}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Overview of your real estate investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{property.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </span>
                      <Badge variant="outline">{property.type}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{property.currentValue}</div>
                      <div className="text-muted-foreground">Current Value</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{property.monthlyIncome}</div>
                      <div className="text-muted-foreground">Monthly Income</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {property.roi}
                      </div>
                      <div className="text-muted-foreground">ROI</div>
                    </div>
                    <div className="text-center">
                      <Badge variant={property.status === "Performing" ? "default" : "destructive"}>
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Portfolio