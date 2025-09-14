import { DashboardLayout } from "@/components/DashboardLayout"
import { StatCard } from "@/components/StatCard"
import { 
  TrendingUp, 
  Calculator, 
  Image, 
  Box, 
  Search, 
  Store, 
  Briefcase,
  MessageSquare,
  HelpCircle
} from "lucide-react"

const Dashboard = () => {
  const widgets = [
    {
      title: "Market Analysis",
      description: "Latest trends & insights",
      icon: TrendingUp,
      link: "/market-analysis",
      value: "2.4%"
    },
    {
      title: "ROI Calculator",
      description: "Estimate investment returns",
      icon: Calculator,
      link: "/roi-calculator"
    },
    {
      title: "2D Rendering",
      description: "Visualize architectural designs",
      icon: Image,
      link: "/rendering-2d"
    },
    {
      title: "3D Rendering",
      description: "Interactive 3D visualization",
      icon: Box,
      link: "/rendering-3d"
    },
    {
      title: "Property Search",
      description: "Find properties worldwide",
      icon: Search,
      link: "/property-search",
      value: "1,247"
    },
    {
      title: "Marketplace",
      description: "Buy and sell real estate assets",
      icon: Store,
      link: "/marketplace",
      value: "342"
    },
    {
      title: "Portfolio",
      description: "Track your investments",
      icon: Briefcase,
      link: "/portfolio",
      value: "$2.4M"
    },
    {
      title: "Reviews",
      description: "What our users say",
      icon: MessageSquare,
      link: "/reviews"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      link: "/faq"
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground">Choose a service to begin</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {widgets.map((widget, index) => (
            <StatCard
              key={index}
              title={widget.title}
              description={widget.description}
              icon={widget.icon}
              link={widget.link}
              value={widget.value}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard