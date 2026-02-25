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
    Loader2,
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
} from "recharts"
import { BottomNav } from "@/components/bottom-nav"
import { useDashboardStats, useRealtimeWaterData } from "@/hooks/useWaterData"
import { format } from "date-fns"

export default function Dashboard() {
    const { stats, loading: statsLoading } = useDashboardStats(15000)
    const { data: realtimeData, loading: realtimeLoading } = useRealtimeWaterData(24, 30000)

    // Transform realtime data for hourly chart (last 12 hours)
    const hourlyData = realtimeData
        .slice(-72) // Last 12 hours (72 readings at 5min intervals)
        .filter((_, index) => index % 12 === 0) // Take one reading per hour
        .map((reading) => ({
            hour: format(new Date(reading.reading_date), "HH:mm"),
            usage: parseFloat(reading.reading_value),
        }))

    // Calculate values from stats
    const currentUsage = stats ? parseFloat(stats.total_today) : 0
    const currentReading = stats ? parseFloat(stats.current_reading) : 0
    const averageHourly = stats ? parseFloat(stats.average_hourly) : 0
    const changePercentage = stats ? parseFloat(stats.change_percentage) : 0
    const isIncreasing = changePercentage > 0

    // Monthly goal (you can make this dynamic later)
    const monthlyGoal = 300 // 300 liters per month
    const goalProgress = (currentUsage / monthlyGoal) * 100
    const isOnTrack = goalProgress <= 80

    return (
        <div className="min-h-screen bg-slate-50 md:p-8 p-4 pb-24 font-sans text-slate-900">
            {/* Header Pro */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tableau de Bord Consommation</h1>
                    <p className="text-slate-500 mt-1">Vue d'ensemble et suivi en temps réel</p>
                </div>
                <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm transition-all" asChild>
                    <a href="/dashboard/archives" className="flex items-center gap-2">
                        <History className="h-4 w-4" />
                        <span>Archives Historiques</span>
                    </a>
                </Button>
            </header>

            {/* Alert Section (Conditional) */}
            {stats && parseFloat(stats.current_reading) > 4.0 && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Alert className="bg-orange-50 border-orange-200 text-orange-900 shadow-sm">
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                        <AlertDescription className="ml-2 flex items-center justify-between w-full">
                            <span>
                                <strong className="font-semibold">Attention :</strong> Débit inhabituel détecté de {parseFloat(stats.current_reading).toFixed(2)} L.
                            </span>
                            <Button variant="link" className="text-orange-700 underline hover:text-orange-900 h-auto p-0 md:ml-4">
                                Voir détails
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Metric 1 */}
                <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Consommation du Jour</CardTitle>
                        <Droplets className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-blue-100" />
                        ) : (
                            <div>
                                <div className="text-3xl font-bold text-slate-900">{currentUsage.toFixed(1)} L</div>
                                <p className="text-xs text-slate-400 mt-1 font-medium">Ce mois</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Metric 2 */}
                <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Débit Actuel</CardTitle>
                        <Zap className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-amber-100" />
                        ) : (
                            <div>
                                <div className="text-3xl font-bold text-slate-900">{currentReading.toFixed(2)} L</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${currentReading > 0 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                                        {currentReading > 0 ? "Actif" : "Inactif"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Metric 3 */}
                <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-white rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Tendance (24h)</CardTitle>
                        {isIncreasing ? <TrendingUp className="h-4 w-4 text-red-500" /> : <TrendingDown className="h-4 w-4 text-emerald-500" />}
                    </CardHeader>
                    <CardContent>
                        {statsLoading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-emerald-100" />
                        ) : (
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900">{Math.abs(changePercentage).toFixed(0)}%</span>
                                    <span className={`text-sm font-medium ${isIncreasing ? "text-red-600" : "text-emerald-600"}`}>
                                        {isIncreasing ? "Hausse" : "Baisse"}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">vs Hier ({stats ? parseFloat(stats.total_yesterday).toFixed(0) : "0"} L)</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Main Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Charts Card */}
                    <Card className="border-slate-100 shadow-sm bg-white rounded-xl overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-slate-800">Analyse Horaire</CardTitle>
                            <CardDescription>Flux de consommation sur les 12 dernières heures</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px] pl-0">
                            {realtimeLoading && hourlyData.length === 0 ? (
                                <div className="h-full flex items-center justify-center bg-slate-50/50 rounded-lg mx-6">
                                    <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={hourlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="hour"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                            }}
                                            itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                                            formatter={(value) => [`${value} L`, "Conso"]}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="usage"
                                            stroke="#0ea5e9"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorUsage)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Smart Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className={`border shadow-sm rounded-xl ${isIncreasing ? "bg-amber-50/30 border-amber-100" : "bg-emerald-50/30 border-emerald-100"}`}>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                    {isIncreasing ? <TrendingUp className="h-5 w-5 text-amber-600" /> : <CheckCircle className="h-5 w-5 text-emerald-600" />}
                                    <span className={isIncreasing ? "text-amber-900" : "text-emerald-900"}>
                                        {isIncreasing ? "Attention à la hausse" : "Excellent progrès"}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className={`text-sm ${isIncreasing ? "text-amber-800" : "text-emerald-800"}`}>
                                    {isIncreasing
                                        ? `Votre consommation a augmenté de ${Math.abs(changePercentage).toFixed(1)}% par rapport à la veille.`
                                        : `Vous avez économisé ${Math.abs(changePercentage).toFixed(1)}% d'eau par rapport à hier. Continuez !`}
                                </p>
                            </CardContent>
                        </Card>

                        {averageHourly > 2.0 && (
                            <Card className="bg-blue-50/30 border-blue-100 shadow-sm rounded-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-blue-900">
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                        Moyenne Élevée
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-blue-800">
                                        Moyenne actuelle de {averageHourly.toFixed(2)} L/h. Essayez de réduire l'usage en heures pleines.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Right Column (1/3 width) - Goals & Actions */}
                <div className="space-y-6">
                    {/* Monthly Goal - Redesigned */}
                    <Card className="border-slate-100 shadow-sm bg-white rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                            <Target className="h-40 w-40 text-slate-900" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-slate-800">Objectif Mensuel</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-5xl font-bold text-slate-900 tracking-tight">{currentUsage.toFixed(0)}</span>
                                <span className="text-lg text-slate-400 font-medium mb-1.5">/ {monthlyGoal} L</span>
                            </div>

                            <Progress value={goalProgress} className="h-2.5 bg-slate-100" />

                            <div className="flex justify-between items-center mt-3 text-sm">
                                <span className="text-slate-500 font-medium">Restant : <span className="text-slate-900">{(monthlyGoal - currentUsage).toFixed(1)} L</span></span>
                                <Badge variant={isOnTrack ? "secondary" : "destructive"} className={`${isOnTrack ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-amber-100 text-amber-700 hover:bg-amber-200"} border-0`}>
                                    {isOnTrack ? "Sur la voie" : "Dépassement"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-slate-100 shadow-sm bg-white rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-slate-800">Actions Rapides</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-24 flex flex-col gap-3 hover:bg-blue-50/50 hover:border-blue-200 hover:text-blue-700 transition-all border-slate-200" asChild>
                                <a href="/realtime">
                                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                        <Droplets className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium">Temps Réel</span>
                                </a>
                            </Button>
                            <Button variant="outline" className="h-24 flex flex-col gap-3 hover:bg-purple-50/50 hover:border-purple-200 hover:text-purple-700 transition-all border-slate-200" asChild>
                                <a href="/billing">
                                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium">Facturation</span>
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Meter Status Compact */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-100 p-2 rounded-full">
                                <CheckCircle className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-slate-900">État du Système</div>
                                <div className="text-xs text-slate-500">Normal</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-medium text-slate-400">Dernière maj</div>
                            <div className="text-xs font-bold text-slate-900">À l'instant</div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    )
}
