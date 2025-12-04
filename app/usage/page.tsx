"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, Calendar, TrendingDown, Target, Droplets, DollarSign, Zap } from "lucide-react"
import Link from "next/link"

const monthlyData = [
  { month: "Jul", usage: 18.5, cost: 38.2, target: 20, efficiency: 92 },
  { month: "Aug", usage: 22.1, cost: 45.6, target: 20, efficiency: 88 },
  { month: "Sep", usage: 19.8, cost: 40.8, target: 20, efficiency: 90 },
  { month: "Oct", usage: 16.2, cost: 33.4, target: 20, efficiency: 95 },
  { month: "Nov", usage: 20.5, cost: 42.3, target: 20, efficiency: 89 },
  { month: "Dec", usage: 24.5, cost: 47.8, target: 20, efficiency: 85 },
]

const weeklyData = [
  { week: "Week 1", usage: 6.2, lastYear: 7.1, weather: "Cold" },
  { week: "Week 2", usage: 5.8, lastYear: 6.8, weather: "Mild" },
  { week: "Week 3", usage: 6.5, lastYear: 7.2, weather: "Cold" },
  { week: "Week 4", usage: 5.9, lastYear: 6.9, weather: "Mild" },
]

const dailyData = [
  { day: "Mon", usage: 0.8, peak: 1.2, average: 0.9 },
  { day: "Tue", usage: 0.9, peak: 1.1, average: 0.9 },
  { day: "Wed", usage: 0.7, peak: 1.0, average: 0.9 },
  { day: "Thu", usage: 1.1, peak: 1.3, average: 0.9 },
  { day: "Fri", usage: 0.8, peak: 1.2, average: 0.9 },
  { day: "Sat", usage: 1.2, peak: 1.4, average: 0.9 },
  { day: "Sun", usage: 1.0, peak: 1.3, average: 0.9 },
]

export default function UsageHistory() {
  const [timeRange, setTimeRange] = useState("6months")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Usage Analytics</h1>
            <p className="text-sm text-blue-100">Detailed water consumption insights</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4" />
              -12%
            </div>
            <div className="text-xs text-blue-100">vs Last Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">85%</div>
            <div className="text-xs text-blue-100">Efficiency Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">$2.40</div>
            <div className="text-xs text-blue-100">Saved This Month</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {/* Enhanced Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="4weeks">Last 4 Weeks</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Custom Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Compare</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Main Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                  Water Usage Trends
                </CardTitle>
                <CardDescription>Monthly consumption with targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "usage") return [`${value} m³`, "Usage"]
                          if (name === "target") return [`${value} m³`, "Target"]
                          return [`${value} m³`, name]
                        }}
                      />
                      <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>This Month's Weekly Breakdown</CardTitle>
                <CardDescription>Week-by-week usage analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            {/* Year-over-Year Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Year-over-Year Comparison</CardTitle>
                <CardDescription>Compare with previous year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={3} name="This Year" />
                      <Line
                        type="monotone"
                        dataKey="lastYear"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Last Year"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Daily Patterns */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Usage Patterns</CardTitle>
                <CardDescription>This week vs. average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual" />
                      <Line type="monotone" dataKey="average" stroke="#ef4444" strokeWidth={2} name="Average" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Comparison Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">-12%</span>
                  </div>
                  <p className="text-sm text-gray-600">vs Last Month</p>
                  <p className="text-xs text-gray-500">2.8 m³ less</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold text-green-600">-8%</span>
                  </div>
                  <p className="text-sm text-gray-600">vs Last Year</p>
                  <p className="text-xs text-gray-500">2.1 m³ less</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-4">
            {/* Efficiency Score */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Zap className="h-5 w-5" />
                  Water Efficiency Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">85</div>
                  <div className="text-sm text-green-700">out of 100</div>
                  <Badge className="mt-2 bg-green-100 text-green-800">Good</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Usage vs Target</span>
                    <span className="font-medium">82/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consistency</span>
                    <span className="font-medium">88/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Management</span>
                    <span className="font-medium">85/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Over Time</CardTitle>
                <CardDescription>Monthly efficiency scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Efficiency"]} />
                      <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Efficiency Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Efficiency Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Reduce Peak Usage</p>
                    <p className="text-sm text-blue-700">
                      Your 6-9 PM usage is 40% above average. Spread activities throughout the day.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Droplets className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Weekend Optimization</p>
                    <p className="text-sm text-green-700">
                      Consider doing laundry and dishwashing on weekdays when usage is lower.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">121.6 m³</span>
              </div>
              <p className="text-sm text-gray-600">Total Usage (6 months)</p>
              <p className="text-xs text-gray-500">20.3 m³ average per month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">$248.10</span>
              </div>
              <p className="text-sm text-gray-600">Total Cost (6 months)</p>
              <p className="text-xs text-gray-500">$41.35 average per month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
