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
const { stats, loading: statsLoading } = useDashboardStats(1000)   // 1 second! 
const { data: realtimeData, loading: realtimeLoading } = useRealtimeWaterData(24, 2000)  // 2 seconds
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-20">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">Bonjour! 👋</h1>
                            <Button
                                size="sm"
                                className="h-8 bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm transition-all shadow-sm"
                                asChild
                            >
                                <a href="/dashboard/archives">
                                    <History className="h-3.5 w-3.5 mr-2 opacity-90" />
                                    <span className="text-xs font-semibold tracking-wide">ARCHIVES</span>
                                </a>
                            </Button>
                        </div>
                        <p className="text-blue-100 text-sm">Voici votre aperçu de consommation d'eau</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-blue-100">Aujourd'hui</div>
                        {statsLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <div className="text-xl font-bold">{currentUsage.toFixed(2)} L</div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                        {statsLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                            <>
                                <div className="text-lg font-semibold">{currentUsage.toFixed(1)} L</div>
                                <div className="text-xs text-blue-100">Ce Mois</div>
                            </>
                        )}
                    </div>
                    <div className="text-center">
                        {statsLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                            <>
                                <div className="text-lg font-semibold">{currentReading.toFixed(2)} L</div>
                                <div className="text-xs text-blue-100">Débit Actuel</div>
                            </>
                        )}
                    </div>
                    <div className="text-center">
                        {statsLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        ) : (
                            <>
                                <div className="text-lg font-semibold flex items-center justify-center gap-1">
                                    {isIncreasing ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                    {Math.abs(changePercentage).toFixed(0)}%
                                </div>
                                <div className="text-xs text-blue-100">vs Hier</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6 -mt-4">
                {/* Leak Detection Alert - Show only if high usage detected */}
                {stats && parseFloat(stats.current_reading) > 4.0 && (
                    <Alert className="border-orange-200 bg-orange-50">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                            <strong>Consommation élevée détectée!</strong> Débit inhabituel de{" "}
                            {parseFloat(stats.current_reading).toFixed(2)} L.
                            <Button variant="link" className="p-0 h-auto text-orange-600 underline ml-1">
                                Voir détails
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Real-time Monitoring Button */}
                <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 text-lg font-semibold shadow-lg"
                    asChild
                >
                    <a href="/realtime" className="flex items-center justify-center gap-3">
                        <Droplets className="h-6 w-6" />
                        <span>Voir la Consommation en Temps Réel</span>
                        <TrendingUp className="h-5 w-5" />
                    </a>
                </Button>

                {/* Water Usage Goal */}
                <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-green-800">
                            <Target className="h-5 w-5" />
                            Objectif Mensuel
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-green-700">
                                    {currentUsage.toFixed(1)} L de {monthlyGoal} L objectif
                                </span>
                                <Badge
                                    variant={isOnTrack ? "secondary" : "destructive"}
                                    className={isOnTrack ? "bg-green-100 text-green-800" : ""}
                                >
                                    {isOnTrack ? "Sur la Bonne Voie" : "Au-dessus"}
                                </Badge>
                            </div>
                            <Progress value={goalProgress} className="h-3" />
                            <div className="flex justify-between text-xs text-green-600">
                                <span>{(monthlyGoal - currentUsage).toFixed(1)} L restants</span>
                                <span>{Math.round(goalProgress)}% utilisé</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Enhanced Usage Chart - Real Data */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Droplets className="h-5 w-5 text-blue-600" />
                            Consommation Horaire
                        </CardTitle>
                        <CardDescription>Dernières 12 heures - Données réelles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {realtimeLoading && hourlyData.length === 0 ? (
                            <div className="h-64 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : (
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={hourlyData}>
                                        <defs>
                                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${value} L`, "Consommation"]} />
                                        <Area
                                            type="monotone"
                                            dataKey="usage"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorUsage)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Statistiques du Jour</CardTitle>
                            <CardDescription>Données en temps réel</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {statsLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Total Aujourd'hui</span>
                                        <span className="font-semibold">{currentUsage.toFixed(2)} L</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Moyenne Horaire</span>
                                        <span className="font-semibold">{averageHourly.toFixed(2)} L/h</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Débit Actuel</span>
                                        <span className="font-semibold">{currentReading.toFixed(2)} L</span>
                                    </div>

                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Comparaison</CardTitle>
                            <CardDescription>Aujourd'hui vs Hier</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {statsLoading ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Hier</span>
                                        <span className="font-semibold">
                                            {stats ? parseFloat(stats.total_yesterday).toFixed(2) : "0.00"} L
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Aujourd'hui</span>
                                        <span className="font-semibold">{currentUsage.toFixed(2)} L</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Changement</span>
                                        <span
                                            className={`font-semibold flex items-center gap-1 ${isIncreasing ? "text-red-600" : "text-green-600"
                                                }`}
                                        >
                                            {isIncreasing ? (
                                                <TrendingUp className="h-4 w-4" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4" />
                                            )}
                                            {Math.abs(changePercentage).toFixed(1)}%
                                        </span>
                                    </div>

                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Smart Insights */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-600" />
                            Analyses Intelligentes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {isIncreasing ? (
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div>
                                    <p className="font-medium text-yellow-800">Consommation en Hausse</p>
                                    <p className="text-sm text-yellow-700">
                                        Votre consommation est {Math.abs(changePercentage).toFixed(1)}% plus élevée
                                        qu'hier. Pensez à vérifier les fuites potentielles.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                <div>
                                    <p className="font-medium text-green-800">Excellent Progrès!</p>
                                    <p className="text-sm text-green-700">
                                        Vous utilisez {Math.abs(changePercentage).toFixed(1)}% moins d'eau qu'hier.
                                        Continuez comme ça!
                                    </p>
                                </div>
                            </div>
                        )}

                        {averageHourly > 2.0 && (
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-medium text-blue-800">Consommation Moyenne Élevée</p>
                                    <p className="text-sm text-blue-700">
                                        Votre moyenne horaire est de {averageHourly.toFixed(2)} L/h. Envisagez de
                                        réduire votre consommation pendant les heures de pointe.
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Enhanced Meter Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>État du Système</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                                <div>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800 mb-1">
                                        Actif
                                    </Badge>
                                    <p className="text-xs text-gray-600">État du Compteur</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <Droplets className="h-6 w-6 text-blue-500" />
                                <div>
                                    <div className="font-semibold text-blue-800">
                                        {currentReading > 3 ? "Élevé" : "Normal"}
                                    </div>
                                    <p className="text-xs text-gray-600">Débit d'Eau</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            Dernière lecture: Maintenant • Prochaine lecture: Dans 5 minutes
                        </p>
                    </CardContent>
                </Card>

                {/* Enhanced Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions Rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:bg-blue-50"
                            asChild
                        >
                            <a href="/usage">
                                <History className="h-6 w-6 text-blue-600" />
                                <span className="text-sm font-medium">Historique</span>
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:bg-green-50"
                            asChild
                        >
                            <a href="/billing">
                                <CreditCard className="h-6 w-6 text-green-600" />
                                <span className="text-sm font-medium">Facturation</span>
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 hover:bg-orange-50"
                            asChild
                        >
                            <a href="/notifications">
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                                <span className="text-sm font-medium">Notifications</span>
                                <Badge variant="destructive" className="text-xs">
                                    {stats && parseFloat(stats.current_reading) > 4.0 ? "1" : "0"}
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
