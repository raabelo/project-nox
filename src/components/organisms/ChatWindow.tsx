"use client";

import { useState } from "react";
import ChatBubble from "../molecules/ChatBubble";
import { DialogMessageWithCharacter } from "@/types/prismaPayloads";
import { Prisma } from "@prisma/client";
import { postDialogMessage } from "@/services/dialogMessage.service";
import { sendToAI } from "@/services/ai.service";

interface ChatWindowProps {
  gameId: string;
}

export default function ChatWindow({ gameId }: ChatWindowProps) {
  const [messages, setMessages] = useState<DialogMessageWithCharacter[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);

    try {
      const playerMessageInput: Prisma.DialogMessageCreateInput = {
        message: input,
        role: "PLAYER_CHARACTER",
        game: { connect: { id: gameId } },
      };

      const aiResponse = await sendToAI({
        gameId,
        characterId: "demo-player",
        playerInput: input,
      });

      if (aiResponse) {
        console.log(aiResponse)
      }

      setInput("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col size-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} message={m} />
        ))}
      </div>

      <form className="flex gap-2" onSubmit={handleSend}>
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua ação..."
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
