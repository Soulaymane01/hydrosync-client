"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Droplets,
  CreditCard,
  History,
  Phone,
  AlertCircle,
  CheckCircle,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { BottomNav } from "@/components/bottom-nav"

const usageData = [
  { day: "1", usage: 12, target: 15 },
  { day: "5", usage: 15, target: 15 },
  { day: "10", usage: 18, target: 15 },
  { day: "15", usage: 14, target: 15 },
  { day: "20", usage: 22, target: 15 },
  { day: "25", usage: 19, target: 15 },
  { day: "30", usage: 16, target: 15 },
]

const hourlyData = [
  { hour: "6AM", usage: 2.1 },
  { hour: "9AM", usage: 3.8 },
  { hour: "12PM", usage: 1.2 },
  { hour: "3PM", usage: 0.8 },
  { hour: "6PM", usage: 4.2 },
  { hour: "9PM", usage: 2.5 },
  { hour: "12AM", usage: 0.3 },
]

const usageBreakdown = [
  { name: "Bathroom", value: 45, color: "#3b82f6" },
  { name: "Kitchen", value: 25, color: "#10b981" },
  { name: "Laundry", value: 20, color: "#f59e0b" },
  { name: "Garden", value: 10, color: "#8b5cf6" },
]

export default function Dashboard() {
  const currentUsage = 24.5
  const monthlyGoal = 30
  const goalProgress = (currentUsage / monthlyGoal) * 100
  const isOnTrack = goalProgress <= 80 // 80% through month, should be under 80% of goal

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Sarah! 👋</h1>
            <p className="text-blue-100 text-sm">Here's your water usage overview</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Today</div>
            <div className="text-xl font-bold">0.82 m³</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">24.5 m³</div>
            <div className="text-xs text-blue-100">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">$47.80</div>
            <div className="text-xs text-blue-100">Current Bill</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4" />
              -12%
            </div>
            <div className="text-xs text-blue-100">vs Last Month</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Leak Detection Alert */}
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Potential leak detected!</strong> Unusual water flow detected at 3:00 AM.
            <Button variant="link" className="p-0 h-auto text-orange-600 underline ml-1">
              View details
            </Button>
          </AlertDescription>
        </Alert>

        {/* Water Usage Goal */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Target className="h-5 w-5" />
              Monthly Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-700">24.5 m³ of 30 m³ goal</span>
                <Badge
                  variant={isOnTrack ? "secondary" : "destructive"}
                  className={isOnTrack ? "bg-green-100 text-green-800" : ""}
                >
                  {isOnTrack ? "On Track" : "Over Target"}
                </Badge>
              </div>
              <Progress value={goalProgress} className="h-3" />
              <div className="flex justify-between text-xs text-green-600">
                <span>5.5 m³ remaining</span>
                <span>{Math.round(goalProgress)}% used</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Usage Trends
            </CardTitle>
            <CardDescription>Daily usage vs. target (December 2024)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} m³`, name === "usage" ? "Actual" : "Target"]} />
                  <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsage)" />
                  <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usage Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage by Area</CardTitle>
              <CardDescription>Where your water goes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={usageBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {usageBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {usageBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">
                      {item.name} {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Pattern</CardTitle>
              <CardDescription>Hourly usage breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} m³`, "Usage"]} />
                    <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Billing Summary */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <CreditCard className="h-5 w-5" />
              Billing Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">$47.80</div>
                <div className="text-sm text-gray-600">Current Balance</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-lg font-semibold">Jan 15</div>
                <div className="text-sm text-gray-600">Due Date</div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Last Payment</span>
              <span className="font-medium">$42.30 - Dec 12</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
              <Button variant="outline">
                <History className="h-4 w-4 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smart Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Peak Usage Alert</p>
                <p className="text-sm text-yellow-700">
                  Your evening usage (6-9 PM) is 40% higher than average. Consider spreading usage throughout the day.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Great Progress!</p>
                <p className="text-sm text-green-700">
                  You're using 12% less water than last month. Keep up the good work!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Meter Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 mb-1">
                    Active
                  </Badge>
                  <p className="text-xs text-gray-600">Meter Status</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-semibold text-blue-800">Normal</div>
                  <p className="text-xs text-gray-600">Water Pressure</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Last reading: Today, 8:00 AM • Next reading: Tomorrow, 8:00 AM</p>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-blue-50" asChild>
              <a href="/usage">
                <History className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Usage History</span>
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-green-50" asChild>
              <a href="/billing">
                <CreditCard className="h-6 w-6 text-green-600" />
                <span className="text-sm font-medium">Pay Bill</span>
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-orange-50" asChild>
              <a href="/notifications">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-medium">Notifications</span>
                <Badge variant="destructive" className="text-xs">
                  2
                </Badge>
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-purple-50">
              <Phone className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">Support</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
