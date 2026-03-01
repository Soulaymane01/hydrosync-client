"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        // Check for user data in local storage
        const userData = localStorage.getItem("hydrosync-client-user")

        if (!userData) {
            // No user data found, redirect to login
            router.push("/")
            return
        }

        try {
            const user = JSON.parse(userData)
            if (!user.token) {
                // No token found, redirect to login
                router.push("/")
                return
            }

            // User is authorized
            setAuthorized(true)
        } catch (e) {
            // Invalid JSON, clear and redirect
            localStorage.removeItem("hydrosync-client-user")
            router.push("/")
        }
    }, [router])

    // Prevent flashing of protected content
    if (!authorized) {
        return null
    }

    return <>{children}</>
}
