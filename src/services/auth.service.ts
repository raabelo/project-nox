import { api } from "@/lib/axios";

export interface LoginPayload {
    identifier: string;
    password: string;
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
