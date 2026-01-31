import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
})

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
