"use client";

import ChatWindow from "@/components/organisms/ChatWindow";
import { useParams } from "next/navigation";

export default function GamePage() {
    const params = useParams<{ gameId: string }>();
    
    const gameId = params.gameId;

    if (!gameId) return <p>Game ID não encontrado.</p>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Jogo: {gameId}</h1>
            <ChatWindow gameId={gameId} />
        </div>
    );
}
