import { api } from "@/lib/axios";

export async function getUsers() {
    const { data } = await api.get("/users");
    return data;
}

export async function getUserById(id: string) {
    const { data } = await api.get(`/users/${id}`);
    return data;
}

export async function postUser(payload: { name: string; email: string }) {
    const { data } = await api.post("/users", payload);
    return data;
}
