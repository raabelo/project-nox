"use client";

import { useEffect, useState } from "react";

export function useCountUsers() {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCount() {
            try {
                setLoading(true);
                const res = await fetch("/api/users/count");
                if (!res.ok) throw new Error("Erro ao buscar contagem");

                const data = await res.json();
                setCount(data.count);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchCount();
    }, []);

    return { count, loading, error };
}
