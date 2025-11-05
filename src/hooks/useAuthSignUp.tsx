import { AuthResponse, RegisterPayload, registerUser } from "@/services/auth.service";
import { useState, useCallback, useRef, useEffect } from "react";

export default function useAuthSignUp() {
    const [data, setData] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mountedRef = useRef(true);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const signUp = useCallback(async (payload: RegisterPayload): Promise<AuthResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await registerUser(payload);
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

    return { signUp, data, isLoading, error } as const;
}
