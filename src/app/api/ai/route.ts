import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { searchMemory, remember } from "@/lib/memory";
import { generateText } from "@/lib/ai";
import generateAIPrompt from "@/app/api/ai/generateAIPrompt";
import getMessageSender from "./getMessageSender";

const MEMORY_SEPARATOR = "---MEMORY---";
const DIALOGUE_DEPTH = 10;

export async function POST(req: Request) {
    try {
        const { gameId, characterId, playerInput } = await req.json();

        if (!gameId || !characterId || !playerInput) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }
        
        // 1️⃣ Histórico da sessão
        const history = (
            await prisma.dialogMessage.findMany({
                where: { gameId },
                orderBy: { createdAt: "desc" },
                take: DIALOGUE_DEPTH,
                include: {
                    character: { select: { name: true } },
                },
            })
        ).reverse();
        const historyText = history.map((h) => `${getMessageSender(h)}: ${h.message}`).join("\n");

        // 2️⃣ Contexto da memória
        const relevant = await searchMemory(playerInput);
        const memoryContext = relevant.map((m) => `- "${m.name}": ${m.content}`).join("\n");

        // 3️⃣ Prompt para a IA
        const prompt = generateAIPrompt(MEMORY_SEPARATOR, {
            historyText,
            memoryContext,
            playerInput,
        });

        // 4️⃣ Gera resposta via Gemini
        const iaResponse = await generateText(prompt);

        // 5️⃣ Salva no histórico do jogo
        await prisma.dialogMessage.create({
            data: { gameId, characterId, message: playerInput, role: "PLAYER_CHARACTER" },
        });       
        
        // 6️⃣ Separa narrativa e memórias
        const [narrative, memoryJson] = iaResponse.split(MEMORY_SEPARATOR).map((s) => s.trim());

        // 7️⃣ Limpa e processa memórias
        if (memoryJson) {
            let cleaned = memoryJson;

            // Remove blocos de markdown ```json ... ```
            if (cleaned.startsWith("```")) {
                cleaned = cleaned.replace(/^```[a-z]*\n?/, "").replace(/```$/, "");
            }

            try {
                const memories = JSON.parse(cleaned);
                for (const m of memories) {
                    await remember(gameId, m.name, m.content);
                }
            } catch (err) {
                console.warn("Não foi possível parsear memórias:", cleaned, err);
            }
        }

        const aiResponse = await prisma.dialogMessage.create({
            data: { gameId, characterId, message: narrative, role: "DUNGEON_MASTER" },
        });

        return NextResponse.json(aiResponse);
    } catch (err) {
        console.error("Erro no endpoint IA:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
