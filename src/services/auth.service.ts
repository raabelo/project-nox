import { api } from "@/lib/axios";

export interface LoginPayload {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    ok: boolean;
    message?: string;
    error?: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", payload);
    return data;
}

export interface RegisterPayload {
    nickname: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token: string;
    user: {
        id: string;
        nickname: string;
        email: string;
    };
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>("/auth/register", payload);
    return data;
}
