// API Service for HydroSync Backend
// Base configuration and utility functions for API calls
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        throw error;
    }
}

// Type Definitions
export interface MeterReading {
    id: string;
    meter_id: string;
    meter_location?: string;
    reading_value: string;
    unit: string;
    reading_date: string;
    reading_type?: string;
    anomaly_detected?: boolean;
    usage_status?: string;
    quality_status?: string;
    created_at?: string;
}

export interface Meter {
    id: string;
    meter_id: string;
    customer: string;
    customer_name?: string;
    type: string;
    model?: string;
    manufacturer?: string;
    serial_number?: string;
    location?: string;
    install_date: string;
    last_reading?: string;
    last_reading_date?: string;
    status?: string;
    firmware_version?: string;
}

export interface DashboardStats {
    current_reading: string;
    total_today: string;
    average_hourly: string;
    total_yesterday: string;
    change_percentage: string;
    active_meters: number;
    total_readings_today: number;
}

export interface RealtimeReading {
    id: string;
    meter_id: string;
    reading_value: string;
    unit: string;
    reading_date: string;
    usage_status?: string;
}

// API Functions

/**
 * Fetch latest meter readings
 */
export async function fetchLatestReadings(limit: number = 10): Promise<MeterReading[]> {
    return apiFetch<MeterReading[]>(`/readings/latest/?limit=${limit}`);
}

/**
 * Fetch real-time data for the last N hours
 */
export async function fetchRealtimeData(hours: number = 24): Promise<RealtimeReading[]> {
    return apiFetch<RealtimeReading[]>(`/readings/realtime/?hours=${hours}`);
}

/**
 * Fetch dashboard statistics
 */
export async function fetchDashboardStats(): Promise<DashboardStats> {
    return apiFetch<DashboardStats>('/dashboard/overview/');
}

/**
 * Fetch all meters
 */
export async function fetchMeters(): Promise<Meter[]> {
    return apiFetch<Meter[]>('/meters/');
}

/**
 * Fetch specific meter details
 */
export async function fetchMeter(id: string): Promise<Meter> {
    return apiFetch<Meter>(`/meters/${id}/`);
}

/**
 * Fetch consumption history for a meter
 */
export async function fetchMeterConsumption(
    meterId: string,
    days: number = 7
): Promise<MeterReading[]> {
    return apiFetch<MeterReading[]>(`/meters/${meterId}/consumption/?days=${days}`);
}

/**
 * Fetch meter readings with filters
 */
export async function fetchMeterReadings(params?: {
    meter_id?: string;
    start_date?: string;
    end_date?: string;
}): Promise<MeterReading[]> {
    const queryParams = new URLSearchParams();

    if (params?.meter_id) queryParams.append('meter_id', params.meter_id);
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const query = queryParams.toString();
    return apiFetch<MeterReading[]>(`/readings/${query ? `?${query}` : ''}`);
}

/**
 * Fetch aggregated statistics
 */
export async function fetchReadingStats(hours: number = 24): Promise<{
    total: string;
    average: string;
    max_reading: string;
    count: number;
}> {
    return apiFetch(`/readings/stats/?hours=${hours}`);
}

export default {
    fetchLatestReadings,
    fetchRealtimeData,
    fetchDashboardStats,
    fetchMeters,
    fetchMeter,
    fetchMeterConsumption,
    fetchMeterReadings,
    fetchReadingStats,
};

// Add a valid token to requests if it exists
api.interceptors.request.use(
    (config) => {
        // Skip adding token ONLY for login requests
        if (config.url?.includes("/auth/login")) {
            return config
        }

        // using distinct key to avoid conflicts if running on same localhost port/domain
        const userData = localStorage.getItem("hydrosync-client-user")
        if (userData) {
            try {
                const user = JSON.parse(userData)
                if (user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`
                }
            } catch (e) {
                console.error("Error parsing user data for token", e)
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default api
