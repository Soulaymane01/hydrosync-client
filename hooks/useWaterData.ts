'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    fetchRealtimeData,
    fetchDashboardStats,
    fetchLatestReadings,
    type RealtimeReading,
    type DashboardStats,
    type MeterReading,
} from '@/lib/api';

/**
 * Hook for fetching real-time water consumption data
 * Auto-refreshes every specified interval
 */
export function useRealtimeWaterData(
    hours: number = 24,
    refreshInterval: number = 10000 // 10 seconds
) {
    const [data, setData] = useState<RealtimeReading[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setError(null);
            const readings = await fetchRealtimeData(hours);
            setData(readings);
        } catch (err) {
            setError(err as Error);
            console.error('Error fetching realtime data:', err);
        } finally {
            setLoading(false);
        }
    }, [hours]);

    useEffect(() => {
        fetchData();

        // Set up auto-refresh
        const interval = setInterval(fetchData, refreshInterval);

        return () => clearInterval(interval);
    }, [fetchData, refreshInterval]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching dashboard statistics
 * Auto-refreshes every specified interval
 */
export function useDashboardStats(refreshInterval: number = 15000) {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchDashboardStats();
            setStats(data);
        } catch (err) {
            setError(err as Error);
            console.error('Error fetching dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();

        // Set up auto-refresh
        const interval = setInterval(fetchStats, refreshInterval);

        return () => clearInterval(interval);
    }, [fetchStats, refreshInterval]);

    return { stats, loading, error, refetch: fetchStats };
}

/**
 * Hook for fetching latest meter readings
 */
export function useLatestReadings(limit: number = 10, refreshInterval: number = 10000) {
    const [readings, setReadings] = useState<MeterReading[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchReadings = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchLatestReadings(limit);
            setReadings(data);
        } catch (err) {
            setError(err as Error);
            console.error('Error fetching latest readings:', err);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchReadings();

        // Set up auto-refresh
        const interval = setInterval(fetchReadings, refreshInterval);

        return () => clearInterval(interval);
    }, [fetchReadings, refreshInterval]);

    return { readings, loading, error, refetch: fetchReadings };
}
