import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getLoreObjects() {
  const { data } = await api.get("/lore-objects");
  return data;
}

export async function getLoreObjectById(id: string) {
  const { data } = await api.get(`/lore-objects/${id}`);
  return data;
}

export async function postLoreObject(payload: Prisma.LoreObjectCreateInput) {
  const { data } = await api.post("/lore-objects", payload);
  return data;
}

export async function updateLoreObject(id: string, payload: Prisma.LoreObjectUpdateInput) {
  const { data } = await api.put(`/lore-objects/${id}`, payload);
  return data;
}

export async function deleteLoreObject(id: string) {
  const { data } = await api.delete(`/lore-objects/${id}`);
  return data;
}
