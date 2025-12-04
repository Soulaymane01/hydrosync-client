"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"
import {
  ArrowLeft,
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Trash2,
  Filter,
  Zap,
  DollarSign,
  Wrench,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const notifications = [
  {
    id: 1,
    type: "alert",
    priority: "high",
    title: "Potential Leak Detected",
    message:
      "Unusual water flow detected at 3:00 AM. Continuous flow of 0.5 L/min for 2 hours. Please check your plumbing.",
    date: "2025-01-02T03:00:00",
    read: false,
    icon: AlertTriangle,
    color: "text-red-500",
    actionable: true,
  },
  {
    id: 2,
    type: "billing",
    priority: "medium",
    title: "Bill Due Reminder",
    message: "Your December water bill of $47.80 is due on January 15, 2025. Set up auto-pay to never miss a payment.",
    date: "2025-01-01T09:00:00",
    read: false,
    icon: DollarSign,
    color: "text-orange-500",
    actionable: true,
  },
  {
    id: 3,
    type: "maintenance",
    priority: "medium",
    title: "Scheduled Maintenance",
    message:
      "Water service will be temporarily interrupted on January 10, 2025 from 9:00 AM to 12:00 PM for routine maintenance in your area.",
    date: "2024-12-28T10:00:00",
    read: false,
    icon: Wrench,
    color: "text-blue-500",
    actionable: false,
  },
  {
    id: 4,
    type: "usage",
    priority: "low",
    title: "High Usage Alert",
    message:
      "Your water usage this month is 15% higher than usual. This could be due to seasonal changes or increased household activity.",
    date: "2024-12-25T08:00:00",
    read: true,
    icon: TrendingUp,
    color: "text-yellow-500",
    actionable: true,
  },
  {
    id: 5,
    type: "system",
    priority: "low",
    title: "Payment Confirmed",
    message: "Your payment of $42.30 for November 2024 has been successfully processed via Credit Card ending in 4532.",
    date: "2024-12-12T14:30:00",
    read: true,
    icon: CheckCircle,
    color: "text-green-500",
    actionable: false,
  },
  {
    id: 6,
    type: "system",
    priority: "low",
    title: "Meter Reading Complete",
    message:
      "Your water meter reading for December 2024 has been completed. Usage: 24.5 m³. Next reading scheduled for January 1, 2025.",
    date: "2024-12-01T08:00:00",
    read: true,
    icon: Info,
    color: "text-blue-500",
    actionable: false,
  },
  {
    id: 7,
    type: "efficiency",
    priority: "low",
    title: "Efficiency Milestone",
    message: "Congratulations! You've achieved an 85% efficiency score this month. You're saving water and money!",
    date: "2024-11-30T12:00:00",
    read: true,
    icon: Zap,
    color: "text-green-500",
    actionable: false,
  },
]

export default function Notifications() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notificationList.filter((n) => !n.read).length
  const highPriorityCount = notificationList.filter((n) => n.priority === "high" && !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notificationList
    if (activeTab === "unread") return notificationList.filter((n) => !n.read)
    if (activeTab === "priority") return notificationList.filter((n) => n.priority === "high")
    return notificationList.filter((n) => n.type === activeTab)
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="text-xs">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </h1>
              <p className="text-sm text-blue-100">Stay updated with your account</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Alert Summary */}
        {highPriorityCount > 0 && (
          <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {highPriorityCount} high priority alert{highPriorityCount > 1 ? "s" : ""} require
                {highPriorityCount === 1 ? "s" : ""} attention
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All ({notificationList.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="priority" className="text-xs">
              Priority ({highPriorityCount})
            </TabsTrigger>
            <TabsTrigger value="alert" className="text-xs">
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No notifications in this category</p>
                  <p className="text-sm text-gray-500">Check back later for updates</p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = notification.icon
                return (
                  <Card
                    key={notification.id}
                    className={`${!notification.read ? "border-blue-200 bg-blue-50" : ""} ${
                      notification.priority === "high" ? "border-l-4 border-l-red-500" : ""
                    } cursor-pointer transition-all hover:shadow-md`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 ${notification.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-medium ${!notification.read ? "text-blue-900" : ""}`}>
                                {notification.title}
                              </h3>
                              {getPriorityBadge(notification.priority)}
                            </div>
                            <div className="flex items-center gap-1">
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className={`text-sm mb-3 ${!notification.read ? "text-blue-800" : "text-gray-600"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{formatDate(notification.date)}</p>
                            {notification.actionable && (
                              <Button variant="outline" size="sm" className="text-xs">
                                Take Action
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notification Settings</h3>
                <p className="text-sm text-gray-600">Manage how you receive alerts</p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
