"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LucideIcon, 
  LayoutDashboard, 
  Clock, 
  Activity, 
  BarChart3, 
  Settings, 
  HelpCircle,
  User,
  CreditCard,
  Bell
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Cron Jobs",
    href: "/dashboard/jobs",
    icon: Clock,
  },
  {
    title: "Status",
    href: "/dashboard/status",
    icon: Activity,
  },
  {
    title: "Statistics",
    href: "/dashboard/statistics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
];

interface DashboardNavProps {
  className?: string;
}

export default function DashboardNav({ className }: DashboardNavProps) {
  const pathname = usePathname();
  
  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}