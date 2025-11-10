import { api } from "@/lib/axios";

export interface AISendPayload {
  gameId: string;
  characterId: string;
  playerInput: string;
}

export interface AIResponse {
  text: string;
  error?: string;
}

export async function sendToAI(payload: AISendPayload): Promise<AIResponse> {
  try {
    const { data } = await api.post<AIResponse>("/ai", payload);
    return data;
  } catch (err: any) {
    console.error("Erro ao comunicar com a IA:", err);
    return { text: "", error: err?.response?.data?.error || "Erro desconhecido" };
  }
}
