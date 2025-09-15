import { NavLink, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  TrendingUp, 
  Calculator, 
  Image, 
  Box, 
  Search, 
  Store, 
  Briefcase, 
  User,
  MessageSquare,
  HelpCircle,
  LogOut
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Logo from "./Logo"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Market Analysis", url: "/market-analysis", icon: TrendingUp },
  { title: "ROI Calculator", url: "/roi-calculator", icon: Calculator },
  { title: "2D Rendering", url: "/rendering-2d", icon: Image },
  { title: "3D Rendering", url: "/rendering-3d", icon: Box },
  { title: "Property Search", url: "/property-search", icon: Search },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Portfolio", url: "/portfolio", icon: Briefcase },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Reviews", url: "/reviews", icon: MessageSquare },
  { title: "FAQ", url: "/faq", icon: HelpCircle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const { toast } = useToast()
  const navigate = useNavigate()

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50"

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Success",
        description: "Logged out successfully",
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 px-2 py-4">
            <Logo />
            {state !== "collapsed" && <span className="font-bold text-lg">VistaForge</span>}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
              <LogOut className="h-4 w-4" />
              {state !== "collapsed" && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}