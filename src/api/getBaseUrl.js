

export function getBaseUrl() {
    const hostname =
        typeof window !== "undefined"
            ? window.location.hostname
            : "";

    if (hostname === "localhost") {
        return ""; // Local backend. Proxy defined in package.json:  "proxy": "http://localhost:8080",
    }

    // Add more dev domains if needed
    if (hostname.includes("vercel.app")) {
        //return "https://village-sponsorship-portal-backend.up.railway.app"; // Production backend
        return process.env.REACT_APP_API_BASE_URL; // Production backend
    }

    // Default fallback
    return process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
}
