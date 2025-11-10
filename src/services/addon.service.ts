import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getAddons() {
    const { data } = await api.get("/addons");
    return data;
}

export async function getAddonById(id: string) {
    const { data } = await api.get(`/addons/${id}`);
    return data;
}

export async function getAddonByUserId(userId: string) {
    const { data } = await api.get(`/addons?userId=${userId}`);
    return data;
}

export async function postAddon(payload: Prisma.AddonCreateInput) {
    const { data } = await api.post("/addons", payload);
    return data;
}

export async function updateAddon(id: string, payload: Prisma.AddonUpdateInput) {
    const { data } = await api.put(`/addons/${id}`, payload);
    return data;
}

export async function deleteAddon(id: string) {
    const { data } = await api.delete(`/addons/${id}`);
    return data;
}
