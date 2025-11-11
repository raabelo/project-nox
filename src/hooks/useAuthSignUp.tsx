"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { registerUser, RegisterPayload } from "@/services/auth.service";

export default function useAuthSignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const signUp = useCallback(async (payload: RegisterPayload) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await registerUser(payload);

            if (!result.token || !result.user.id) throw new Error("Registration failed");

            await signIn("credentials", {
                redirect: false,
                identifier: payload.email,
                password: payload.password,
            });

            return result;
        } catch (err) {
            const e = err instanceof Error ? err : new Error(String(err));
            if (mountedRef.current) setError(e);
            throw e;
        } finally {
            if (mountedRef.current) setIsLoading(false);
        }
    }, []);

    return { signUp, isLoading, error } as const;
}
