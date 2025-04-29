"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Clock, 
  Activity, 
  BarChart3, 
  Settings, 
  HelpCircle,
  User,
  CreditCard,
  Bell
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Cron Jobs",
      icon: Clock,
      href: "/dashboard/jobs",
    },
    {
      label: "Status",
      icon: Activity,
      href: "/dashboard/status",
    },
    {
      label: "Statistics",
      icon: BarChart3,
      href: "/dashboard/statistics",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/dashboard/support",
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                >
                  <Button
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}