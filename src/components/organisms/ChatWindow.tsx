"use client";
import { useState } from "react";

interface Message {
    role: "player" | "ia";
    text: string;
}

interface ChatWindowProps {
    gameId: string;
}

export default function ChatWindow({ gameId }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ia", text: "Bem-vindo ao seu jogo! O mestre IA começa a história..." },
    ]);
    const [input, setInput] = useState("");

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();
        
        if (!input) return;
        const playerMessage: Message = { role: "player", text: input };
        setMessages((prev) => [...prev, playerMessage]);

        console.log("Enviando para IA:", { gameId, characterId: "demo-player", playerInput: input });

        
        const res = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                gameId,
                characterId: "demo-player",
                playerInput: input,
            }),
        });

        if (!res.ok) {
            console.error("Erro no endpoint IA:", await res.text());
            return;
        }

        const data = await res.json();

        setMessages((prev) => [...prev, { role: "ia", text: data.text }]);
        setInput("");
    }

    return (
        <div className="border rounded-lg p-4 flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((m, idx) => (
                    <div key={idx} className={m.role === "ia" ? "text-blue-600" : "text-green-600"}>
                        <strong>{m.role === "ia" ? "Mestre" : "Você"}:</strong> {m.text}
                    </div>
                ))}
            </div>
            <form className="flex gap-2" onSubmit={handleSend}>
                <input
                    className="flex-1 border rounded px-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua ação..."
                />
                <button type="submit" className="bg-blue-600 text-white px-4 rounded">
                    Enviar
                </button>
            </form>
        </div>
    );
}
