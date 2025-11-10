import { api } from "@/lib/axios";
import { Prisma } from "@prisma/client";

export async function getDialogMessages() {
  const { data } = await api.get("/dialog-messages");
  return data;
}

export async function getDialogMessageById(id: string) {
  const { data } = await api.get(`/dialog-messages/${id}`);
  return data;
}

export async function postDialogMessage(payload: Prisma.DialogMessageCreateInput) {
  const { data } = await api.post("/dialog-messages", payload);
  return data;
}

export async function updateDialogMessage(id: string, payload: Prisma.DialogMessageUpdateInput) {
  const { data } = await api.put(`/dialog-messages/${id}`, payload);
  return data;
}

export async function deleteDialogMessage(id: string) {
  const { data } = await api.delete(`/dialog-messages/${id}`);
  return data;
}
