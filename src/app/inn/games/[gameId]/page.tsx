"use client";

import CharactersWindow from "@/components/organisms/CharactersWindow";
import ChatWindow from "@/components/organisms/ChatWindow";
import InnHeader from "@/components/organisms/InnHeader";
import PageWrapper from "@/components/organisms/PageWrapper";
import { useParams } from "next/navigation";

export default function GamePage() {
    const params = useParams<{ gameId: string }>();

    const gameId = params.gameId;

    if (!gameId) return <p>Game ID não encontrado.</p>;

    return (
        <PageWrapper isFullscreen>
            <div className="p-8 flex flex-row h-svh w-svw">
                <div className="flex flex-2 justify-start"></div>

                <section className="flex flex-6 w-full justify-center">
                    <ChatWindow gameId={gameId} />
                </section>

                <div className="flex flex-2 justify-end">
                    <CharactersWindow />
                </div>
            </div>
        </PageWrapper>
    );
}
