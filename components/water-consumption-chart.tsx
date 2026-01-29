'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useRealtimeWaterData } from '@/hooks/useWaterData';
import { Loader2, Droplet, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

export function WaterConsumptionChart() {
    const { data, loading, error } = useRealtimeWaterData(24, 10000);

    if (loading && data.length === 0) {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Consommation d'eau en temps réel</CardTitle>
                    <CardDescription>Dernières 24 heures</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Consommation d'eau en temps réel</CardTitle>
                    <CardDescription>Dernières 24 heures</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[400px]">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Erreur de chargement des données</p>
                        <p className="text-sm text-muted-foreground">{error.message}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Transform data for the chart
    const chartData = data.map((reading) => ({
        time: format(new Date(reading.reading_date), 'HH:mm'),
        fullDate: reading.reading_date,
        value: parseFloat(reading.reading_value),
        status: reading.usage_status,
    }));

    // Calculate trend
    const recentData = chartData.slice(-10);
    const olderData = chartData.slice(-20, -10);
    const recentAvg = recentData.reduce((sum, d) => sum + d.value, 0) / recentData.length;
    const olderAvg = olderData.reduce((sum, d) => sum + d.value, 0) / olderData.length;
    const trend = recentAvg > olderAvg ? 'up' : 'down';
    const trendPercentage = Math.abs(((recentAvg - olderAvg) / olderAvg) * 100).toFixed(1);

    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Droplet className="h-5 w-5 text-blue-500" />
                            Consommation d'eau en temps réel
                        </CardTitle>
                        <CardDescription>Dernières 24 heures - Mise à jour automatique</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        {trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                        )}
                        <span className={trend === 'up' ? 'text-red-500' : 'text-green-500'}>
                            {trendPercentage}%
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="time"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}L`}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Heure
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {payload[0].payload.time}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Débit
                                                    </span>
                                                    <span className="font-bold">
                                                        {payload[0].value} L
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#colorValue)"
                            animationDuration={300}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span>Débit d'eau (Litres)</span>
                    </div>
                    {loading && (
                        <div className="flex items-center gap-1 text-blue-500">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span>Actualisation...</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
