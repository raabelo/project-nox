import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000, // opcional: 10s de timeout
    withCredentials: true, // útil se usa cookies
});

// Aqui já dá pra configurar interceptors se quiser:
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);
