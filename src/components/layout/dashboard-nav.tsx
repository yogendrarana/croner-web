"use client";

import React from "react";
import {
  LayoutDashboard,
  Clock,
  BarChart3,
  Settings,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Cron Jobs",
    icon: Clock,
    href: "/dashboard/cronjobs",
  },
  {
    label: "Metrics",
    icon: BarChart3,
    href: "/dashboard/metrics",
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

];

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn(className)}>
      {/* desktop dashboard nav */}
      <div className="hidden md:flex gap-8 border-b border-border">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link key={route.href} href={route.href}>
              <div
                className={cn(
                  "flex items-center py-4 text-sm font-medium",
                  pathname === route.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {route.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
