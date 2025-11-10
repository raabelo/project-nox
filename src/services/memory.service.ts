import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getMemories() {
  const { data } = await api.get("/memories");
  return data;
}

export async function getMemoryById(id: string) {
  const { data } = await api.get(`/memories/${id}`);
  return data;
}

export async function postMemory(payload: Prisma.MemoryCreateInput) {
  const { data } = await api.post("/memories", payload);
  return data;
}

export async function updateMemory(id: string, payload: Prisma.MemoryUpdateInput) {
  const { data } = await api.put(`/memories/${id}`, payload);
  return data;
}

export async function deleteMemory(id: string) {
  const { data } = await api.delete(`/memories/${id}`);
  return data;
}
