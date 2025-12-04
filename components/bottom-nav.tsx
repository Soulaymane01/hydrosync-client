"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, BarChart3, CreditCard, Bell, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Home",
  },
  {
    href: "/usage",
    icon: BarChart3,
    label: "Usage",
  },
  {
    href: "/billing",
    icon: CreditCard,
    label: "Billing",
    badge: 1, // Pending bill
  },
  {
    href: "/notifications",
    icon: Bell,
    label: "Alerts",
    badge: 3, // Unread notifications
  },
  {
    href: "/account",
    icon: User,
    label: "Account",
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
                isActive ? "text-blue-600 bg-blue-50 scale-105" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-all",
                  isActive ? "text-blue-600 font-semibold" : "text-gray-600",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
