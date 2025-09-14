import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface StatCardProps {
  title: string
  description?: string
  icon: LucideIcon
  link: string
  value?: string | number
}

export function StatCard({ title, description, icon: Icon, link, value }: StatCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {value && (
          <div className="text-2xl font-bold mb-2">{value}</div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mb-4">{description}</p>
        )}
        <Button asChild variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          <Link to={link}>
            Open
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}