"use client"
import { LayoutDashboard, Calendar, Gift, LifeBuoy, Settings, LogOut, Sun, Moon, User, X } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"

interface UserSidebarProps {
  user: { name: string; email: string; accountType: "user" | "admin" }
  onLogout: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

const navItems = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/user/dashboard", icon: LayoutDashboard },
      { title: "My Bookings", url: "/user/bookings", icon: Calendar },
      { title: "Offers", url: "/user/offers", icon: Gift },
    ],
  },
  {
    label: "Support",
    items: [
      { title: "Help", url: "/user/help", icon: LifeBuoy },
      { title: "Account Settings", url: "/user/settings", icon: Settings },
    ],
  },
]

export function UserSidebar({ user, onLogout, isDarkMode, toggleTheme }: UserSidebarProps) {
  const { toggleSidebar } = useSidebar()

  const handleLogoutAndRedirect = () => {
    onLogout()
    redirect("/")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <h1 className={`text-2xl font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>SmartPark</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="md:hidden" // Hide on desktop, only show on mobile for explicit toggle
        >
          <X className="h-6 w-6" />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((group, index) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={window.location.pathname === item.url}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            {index < navItems.length - 1 && <Separator />}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User />
              <span>{user?.name || "Guest"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogoutAndRedirect}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleTheme}>
              {isDarkMode ? <Sun /> : <Moon />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
