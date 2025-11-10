import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getGames() {
  const { data } = await api.get("/games");
  return data;
}

export async function getGameById(id: string) {
  const { data } = await api.get(`/games/${id}`);
  return data;
}

export async function postGame(payload: Prisma.GameCreateInput) {
  const { data } = await api.post("/games", payload);
  return data;
}

export async function updateGame(id: string, payload: Prisma.GameUpdateInput) {
  const { data } = await api.put(`/games/${id}`, payload);
  return data;
}

export async function deleteGame(id: string) {
  const { data } = await api.delete(`/games/${id}`);
  return data;
}
