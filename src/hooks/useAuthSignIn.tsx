import { useState, useCallback, useRef, useEffect } from "react";
import { loginUser, LoginPayload, LoginResponse } from "@/services/auth.service";

export default function useAuthSignIn() {
    const [data, setData] = useState<LoginResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mountedRef = useRef(true);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const signIn = useCallback(async (payload: LoginPayload): Promise<LoginResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await loginUser(payload);
            if (mountedRef.current) setData(result);
            return result;
        } catch (err) {
            const e = err instanceof Error ? err : new Error(String(err));
            if (mountedRef.current) setError(e);
            throw e;
        } finally {
            if (mountedRef.current) setIsLoading(false);
        }
    }, []);

    return { signIn, data, isLoading, error } as const;
}
