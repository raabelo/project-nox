import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getPlayerCharacters() {
  const { data } = await api.get("/player-characters");
  return data;
}

export async function getPlayerCharacterById(id: string) {
  const { data } = await api.get(`/player-characters/${id}`);
  return data;
}

export async function postPlayerCharacter(payload: Prisma.PlayerCharacterCreateInput) {
  const { data } = await api.post("/player-characters", payload);
  return data;
}

export async function updatePlayerCharacter(id: string, payload: Prisma.PlayerCharacterUpdateInput) {
  const { data } = await api.put(`/player-characters/${id}`, payload);
  return data;
}

export async function deletePlayerCharacter(id: string) {
  const { data } = await api.delete(`/player-characters/${id}`);
  return data;
}
