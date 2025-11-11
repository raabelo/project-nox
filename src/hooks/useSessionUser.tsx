"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "@/services/user.service";
import { getSession } from "next-auth/react";

const STALE_TIME = 1000 * 60 * 5; // 5 minuts cache

export function useSessionUser() {
    return useQuery({
        queryKey: ["sessionUser"],
        queryFn: async () => {
            const session = await getSession();
            if (!session || !session.user?.email) throw new Error("No active session");
            
            const user = await getUserByEmail(session.user.email);

            return user;
        },
        staleTime: STALE_TIME,
    });
}
