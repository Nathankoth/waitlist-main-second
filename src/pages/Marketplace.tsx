import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Clock, TrendingUp } from "lucide-react"

const mockListings = [
  {
    id: 1,
    title: "Investment Opportunity - Downtown Complex",
    description: "Prime real estate in the heart of downtown with high rental yield potential.",
    price: "$3,500,000",
    type: "Commercial",
    location: "Chicago, IL",
    postedDate: "2 days ago",
    status: "Active"
  },
  {
    id: 2,
    title: "Luxury Residential Plot",
    description: "Exclusive residential land in premium neighborhood, ready for development.",
    price: "$1,800,000",
    type: "Land",
    location: "Beverly Hills, CA",
    postedDate: "1 week ago",
    status: "Pending"
  },
  {
    id: 3,
    title: "Historic Building Restoration",
    description: "Unique opportunity to restore and modernize a historic building.",
    price: "$2,200,000",
    type: "Historic",
    location: "Boston, MA",
    postedDate: "3 days ago",
    status: "Active"
  }
]

const Marketplace = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell real estate assets</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Post a Listing
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {mockListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{listing.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {listing.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {listing.postedDate}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{listing.price}</div>
                        <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                          {listing.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">{listing.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{listing.type}</Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Listings</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Price</span>
                  <span className="font-semibold">$2.1M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Save Search
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Create Alert
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Marketplace