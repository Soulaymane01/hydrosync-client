"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    ArrowLeft,
    Calendar,
    Download,
    Droplets,
    FileText,
    TrendingDown,
    TrendingUp,
    Search,
    Filter
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"
import { BottomNav } from "@/components/bottom-nav"

// Mock Data for Archives
const monthlyArchives = [
    {
        id: "2026-01",
        month: "Janvier 2026",
        totalUsage: 8450.5,
        dailyAverage: 272.6,
        trend: -2.4, // Percentage change
        status: "optimal", // optimal, warning, high
        billAmount: 42.50,
    },
    {
        id: "2025-12",
        month: "Décembre 2025",
        totalUsage: 8658.2,
        dailyAverage: 279.3,
        trend: 5.1,
        status: "normal",
        billAmount: 43.80,
    },
    {
        id: "2025-11",
        month: "Novembre 2025",
        totalUsage: 8230.0,
        dailyAverage: 274.3,
        trend: -1.2,
        status: "optimal",
        billAmount: 41.20,
    },
    {
        id: "2025-10",
        month: "Octobre 2025",
        totalUsage: 8330.5,
        dailyAverage: 268.7,
        trend: -8.5,
        status: "optimal",
        billAmount: 41.65,
    },
    {
        id: "2025-09",
        month: "Septembre 2025",
        totalUsage: 9105.8,
        dailyAverage: 303.5,
        trend: 12.4,
        status: "high",
        billAmount: 45.90,
    },
    {
        id: "2025-08",
        month: "Août 2025",
        totalUsage: 8100.2,
        dailyAverage: 261.3,
        trend: -5.0,
        status: "optimal",
        billAmount: 40.50,
    },
]

export default function ArchivesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-20">
            {/* Header with Navigation */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-md">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                        asChild
                    >
                        <Link href="/dashboard">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="h-6 w-6 opacity-80" />
                            Historique
                        </h1>
                        <p className="text-blue-100 text-sm">Consultez vos relevés précédents</p>
                    </div>
                </div>

                {/* Yearly Stats Summary */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex justify-between items-center">
                    <div>
                        <div className="text-sm text-blue-100 mb-1">Total Annuel (2026)</div>
                        <div className="text-2xl font-bold">102.4 m³</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-blue-100 mb-1">Moyenne Mensuelle</div>
                        <div className="text-xl font-semibold">8.5 m³</div>
                    </div>
                </div>
            </div>

            <div className="p-4 max-w-4xl mx-auto space-y-6 -mt-2">
                {/* Trend Chart */}
                <Card className="border-blue-100 shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            Évolution de la Consommation
                        </CardTitle>
                        <CardDescription>Vue d'ensemble des 6 derniers mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[...monthlyArchives].reverse()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="month"
                                        tickFormatter={(value) => value.split(' ')[0]}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}m³`}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: number) => [`${(value / 1000).toFixed(2)} m³`, 'Consommation']}
                                    />
                                    <Bar dataKey="totalUsage" radius={[4, 4, 0, 0]} maxBarSize={50}>
                                        {monthlyArchives.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.status === 'optimal' ? '#22c55e' : entry.status === 'high' ? '#f97316' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters & Actions */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    <Button variant="outline" className="bg-white text-blue-700 border-blue-200 shadow-sm whitespace-nowrap">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrer par année
                    </Button>
                    <Button variant="outline" className="bg-white text-blue-700 border-blue-200 shadow-sm whitespace-nowrap">
                        <Search className="h-4 w-4 mr-2" />
                        Rechercher
                    </Button>
                    <div className="flex-1"></div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                        Tout télécharger
                    </Button>
                </div>

                {/* Archives Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {monthlyArchives.map((archive) => (
                        <Card key={archive.id} className="border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                            <CardContent className="p-0">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Left Indicator Strip */}
                                    <div className={`h-1.5 sm:h-auto sm:w-1.5 ${archive.status === 'optimal' ? 'bg-green-500' :
                                        archive.status === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                                        }`} />

                                    <div className="p-5 flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                                        {/* Month & Icon */}
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                                                <FileText className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">{archive.month}</h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>{archive.id}</span>
                                                    <span>•</span>
                                                    <span className={`${archive.status === 'optimal' ? 'text-green-600' :
                                                        archive.status === 'high' ? 'text-orange-600' : 'text-blue-600'
                                                        } font-medium capitalize`}>
                                                        {archive.status === 'optimal' ? 'Économique' : archive.status === 'high' ? 'Élevé' : 'Normal'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex flex-row sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto mt-2 sm:mt-0">

                                            <div className="flex flex-col items-start sm:items-end">
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    Consommation
                                                </div>
                                                <div className="font-bold text-gray-900 text-lg">
                                                    {(archive.totalUsage / 1000).toFixed(2)} m³
                                                </div>
                                                <div className={`text-xs flex items-center gap-1 ${archive.trend > 0 ? 'text-orange-600' : 'text-green-600'
                                                    }`}>
                                                    {archive.trend > 0 ? (
                                                        <TrendingUp className="h-3 w-3" />
                                                    ) : (
                                                        <TrendingDown className="h-3 w-3" />
                                                    )}
                                                    {Math.abs(archive.trend)}% vs mois préc.
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                                                <Download className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
