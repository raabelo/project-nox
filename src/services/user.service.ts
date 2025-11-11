import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getUsers() {
    const { data } = await api.get("/users");
    return data;
}

export async function getUserById(id: string) {
    const { data } = await api.get(`/users/${id}`);
    return data;
}

export async function getUserByEmail(email: string) {
    const { data } = await api.get(`/users?email=${email}`);
    return data;
}

export async function getUsersCount(): Promise<{ count: number }> {
    const { data } = await api.get(`/users/count`);
    return data;
}

export async function postUser(payload: Prisma.UserCreateInput) {
    const { data } = await api.post("/users", payload);
    return data;
}

export async function updateUser(id: string, payload: Prisma.UserUpdateInput) {
    const { data } = await api.put(`/users/${id}`, payload);
    return data;
}

export async function deleteUser(id: string) {
    const { data } = await api.delete(`/users/${id}`);
    return data;
}
