import { prisma } from "@/lib/prisma";
import { embedText } from "@/lib/embeddings";

function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai ** 2, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi ** 2, 0));
  return dot / (magA * magB);
}

export async function searchMemory(query: string, limit = 5) {
  const queryEmbedding = await embedText(query);
  const memories = await prisma.memory.findMany({ where: { embedding: { not: null } } });

  const scored = memories.map(m => ({
    ...m,
    score: cosineSimilarity(queryEmbedding, JSON.parse(m.embedding!))
  }));

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export async function remember(gameId: string, name: string, content: string) {
  const embedding = await embedText(content);

  await prisma.memory.create({
    data: {
      gameId,
      name,
      content,
      embedding: JSON.stringify(embedding),
    },
  });
}