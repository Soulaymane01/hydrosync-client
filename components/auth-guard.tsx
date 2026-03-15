"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { clearStoredSession, getStoredSession } from "@/lib/demo-auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const user = getStoredSession()

        if (!user?.token) {
            router.push("/")
            return
        }

        setAuthorized(true)
    }, [router])

    // Prevent flashing of protected content
    if (!authorized) {
        return null
    }

    return <>{children}</>
}
