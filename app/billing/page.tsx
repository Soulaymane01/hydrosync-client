"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"
import { ArrowLeft, CreditCard, Download, Calendar, TrendingDown, DollarSign, Droplets, Zap, Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import Link from "next/link"

const paymentHistory = [
  {
    id: "INV-2024-12",
    amount: 47.8,
    dueDate: "2025-01-15",
    status: "pending",
    usage: "24.5 m³",
    period: "Dec 2024",
    breakdown: {
      water: 32.5,
      sewer: 12.3,
      fees: 3.0,
    },
  },
  {
    id: "INV-2024-11",
    amount: 42.3,
    dueDate: "2024-12-15",
    status: "paid",
    usage: "20.5 m³",
    period: "Nov 2024",
    paidDate: "2024-12-12",
    method: "Credit Card",
    breakdown: {
      water: 28.1,
      sewer: 11.2,
      fees: 3.0,
    },
  },
  {
    id: "INV-2024-10",
    amount: 33.4,
    dueDate: "2024-11-15",
    status: "paid",
    usage: "16.2 m³",
    period: "Oct 2024",
    paidDate: "2024-11-10",
    method: "Bank Transfer",
    breakdown: {
      water: 21.4,
      sewer: 9.0,
      fees: 3.0,
    },
  },
  {
    id: "INV-2024-09",
    amount: 40.8,
    dueDate: "2024-10-15",
    status: "paid",
    usage: "19.8 m³",
    period: "Sep 2024",
    paidDate: "2024-10-08",
    method: "Credit Card",
    breakdown: {
      water: 26.8,
      sewer: 11.0,
      fees: 3.0,
    },
  },
]

const costTrends = [
  { month: "Sep", amount: 40.8 },
  { month: "Oct", amount: 33.4 },
  { month: "Nov", amount: 42.3 },
  { month: "Dec", amount: 47.8 },
]

const billBreakdown = [
  { name: "Water Usage", value: 32.5, color: "#3b82f6" },
  { name: "Sewer Service", value: 12.3, color: "#10b981" },
  { name: "Service Fees", value: 3.0, color: "#f59e0b" },
]

export default function Billing() {
  const [activeTab, setActiveTab] = useState("current")
  const currentBill = paymentHistory[0]
  const pastBills = paymentHistory.slice(1)
  const daysUntilDue = Math.ceil(
    (new Date(currentBill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-500">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">Billing & Payments</h1>
            <p className="text-sm text-green-100">Manage your water bills and payments</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">${currentBill.amount}</div>
            <div className="text-xs text-green-100">Current Bill</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{daysUntilDue}</div>
            <div className="text-xs text-green-100">Days Until Due</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4" />
              -$5.20
            </div>
            <div className="text-xs text-green-100">vs Last Month</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current Bill</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {/* Enhanced Current Bill */}
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <CreditCard className="h-5 w-5" />
                  Current Bill - {currentBill.period}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Due in {daysUntilDue} days
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">${currentBill.amount}</div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Due {new Date(currentBill.dueDate).toLocaleDateString()}
                  </Badge>
                </div>

                {/* Bill Breakdown Chart */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3">Bill Breakdown</h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={billBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={50}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {billBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${value}`, ""]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {billBreakdown.map((item) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="font-medium">${item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Details */}
                <div className="bg-white rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Usage Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Water Usage</span>
                      <div className="font-semibold">{currentBill.usage}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Rate</span>
                      <div className="font-semibold">$1.33/m³</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Billing Period</span>
                      <div className="font-semibold">{currentBill.period}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Bill ID</span>
                      <div className="font-semibold">{currentBill.id}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4532</p>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4532</p>
                      <p className="text-sm text-gray-600">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Default
                  </Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Auto-Pay */}
            <Card>
              <CardHeader>
                <CardTitle>Auto-Pay Settings</CardTitle>
                <CardDescription>Never miss a payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Auto-Pay Enabled</p>
                    <p className="text-sm text-gray-600">Bills are automatically paid 3 days before due date</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Auto-Pay
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription>Your past water bills and payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{bill.id}</span>
                        <Badge
                          variant={bill.status === "paid" ? "secondary" : "destructive"}
                          className={bill.status === "paid" ? "bg-green-100 text-green-800" : ""}
                        >
                          {bill.status === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <span>
                          {bill.period} • {bill.usage}
                        </span>
                        <span>Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
                      </div>
                      {bill.status === "paid" && (
                        <p className="text-xs text-gray-500 mt-1">
                          Paid {new Date(bill.paidDate!).toLocaleDateString()} via {bill.method}
                        </p>
                      )}
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <div className="font-semibold text-lg">${bill.amount}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* Cost Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Cost Trends
                </CardTitle>
                <CardDescription>Monthly billing analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                      <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Understanding your water costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">$1.33</div>
                    <div className="text-sm text-gray-600">Cost per m³</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$41.35</div>
                    <div className="text-sm text-gray-600">Avg Monthly</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Water Usage (68%)</span>
                    <span className="font-medium">$32.50</span>
                  </div>
                  <Progress value={68} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sewer Service (26%)</span>
                    <span className="font-medium">$12.30</span>
                  </div>
                  <Progress value={26} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Fees (6%)</span>
                    <span className="font-medium">$3.00</span>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Savings Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Savings Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Droplets className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Reduce by 10%</p>
                    <p className="text-sm text-green-700">
                      Save approximately $4.80 per month by reducing usage to 22 m³
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Auto-Pay Discount</p>
                    <p className="text-sm text-blue-700">Get 2% discount on your bill by enabling auto-pay</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}
