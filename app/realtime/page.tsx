"use client"

import { WaterStatsCards } from "@/components/water-stats-cards"
import { WaterConsumptionChart } from "@/components/water-consumption-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLatestReadings } from "@/hooks/useWaterData"
import { Droplet, ArrowLeft, RefreshCw, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

export default function RealtimePage() {
    const { readings, loading, error, refetch } = useLatestReadings(20, 10000)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-500">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <Droplet className="h-6 w-6" />
                                Consommation en Temps Réel
                            </h1>
                            <p className="text-blue-100 text-sm">Données actualisées automatiquement</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-blue-500"
                        onClick={() => refetch()}
                    >
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="p-4 space-y-6 -mt-4">
                {/* Statistics Cards */}
                <WaterStatsCards />

                {/* Real-time Chart */}
                <WaterConsumptionChart />

                {/* Latest Readings Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Dernières Lectures</CardTitle>
                        <CardDescription>
                            Les 20 dernières lectures du compteur
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading && readings.length === 0 ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-8">
                                <p className="text-red-500 mb-2">Erreur de chargement</p>
                                <p className="text-sm text-muted-foreground">{error.message}</p>
                            </div>
                        ) : readings.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Aucune lecture disponible
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {readings.map((reading) => {
                                    const value = parseFloat(reading.reading_value)
                                    const statusColor =
                                        reading.usage_status === "high"
                                            ? "bg-red-100 text-red-800"
                                            : reading.usage_status === "normal"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-blue-100 text-blue-800"

                                    return (
                                        <div
                                            key={reading.id}
                                            className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Droplet className="h-5 w-5 text-blue-500" />
                                                <div>
                                                    <p className="font-medium">{value.toFixed(3)} {reading.unit}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {format(new Date(reading.reading_date), "PPp", { locale: fr })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {reading.meter_location && (
                                                    <span className="text-xs text-muted-foreground hidden sm:inline">
                                                        {reading.meter_location}
                                                    </span>
                                                )}
                                                <Badge variant="secondary" className={statusColor}>
                                                    {reading.usage_status || "normal"}
                                                </Badge>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <Droplet className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-blue-900 mb-1">
                                    Actualisation Automatique
                                </p>
                                <p className="text-sm text-blue-700">
                                    Les données sont actualisées automatiquement toutes les 10 secondes pour vous
                                    fournir les informations les plus récentes sur votre consommation d'eau.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
