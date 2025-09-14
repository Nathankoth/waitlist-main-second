import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Bed, Bath, Square } from "lucide-react"

const mockProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    price: "$1,200,000",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    location: "Miami, FL",
    price: "$2,800,000",
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Cozy Suburban House",
    location: "Austin, TX",
    price: "$650,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/api/placeholder/300/200"
  }
]

const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = ["Under $1M", "$1M - $2M", "Over $2M", "House", "Apartment", "Condo"]

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Property Search</h1>
          <p className="text-muted-foreground">Find properties worldwide</p>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties by location or type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-primary">{property.price}</div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-3 w-3" />
                      {property.beds} beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-3 w-3" />
                      {property.baths} baths
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-3 w-3" />
                      {property.sqft} sqft
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PropertySearch