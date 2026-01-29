'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStats } from '@/hooks/useWaterData';
import { Droplet, TrendingUp, TrendingDown, Activity, Gauge, Loader2 } from 'lucide-react';

export function WaterStatsCards() {
    const { stats, loading, error } = useDashboardStats(15000);

    if (loading && !stats) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Chargement...</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Erreur</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-500">Impossible de charger les statistiques</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentReading = parseFloat(stats.current_reading);
    const totalToday = parseFloat(stats.total_today);
    const averageHourly = parseFloat(stats.average_hourly);
    const changePercentage = parseFloat(stats.change_percentage);
    const isIncreasing = changePercentage > 0;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Current Reading */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Débit Actuel</CardTitle>
                    <Droplet className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{currentReading.toFixed(2)} L</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Dernière lecture
                    </p>
                </CardContent>
            </Card>

            {/* Total Today */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Aujourd'hui</CardTitle>
                    <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalToday.toFixed(2)} L</div>
                    <div className="flex items-center text-xs mt-1">
                        {isIncreasing ? (
                            <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                        ) : (
                            <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                        )}
                        <span className={isIncreasing ? 'text-red-500' : 'text-green-500'}>
                            {Math.abs(changePercentage).toFixed(1)}%
                        </span>
                        <span className="text-muted-foreground ml-1">vs hier</span>
                    </div>
                </CardContent>
            </Card>

            {/* Average Hourly */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Moyenne Horaire</CardTitle>
                    <Gauge className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageHourly.toFixed(2)} L/h</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Consommation moyenne
                    </p>
                </CardContent>
            </Card>

            {/* Active Meters */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compteurs Actifs</CardTitle>
                    <Activity className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.active_meters}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {stats.total_readings_today} lectures aujourd'hui
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
