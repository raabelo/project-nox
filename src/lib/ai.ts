// lib/ai.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const MAX_TOKENS = 4096;
const INFERENCE_MODEL_TEXT = "gemini-2.0-flash";
const INFERENCE_MODEL_IMAGE = "gemini-2.0-flash";

const IMAGE_PLACEHOLDER_URL = "https://via.placeholder.com/300x200.png?text=Mapa+RPG";

export async function generateText(context: string) {
    try {        
        const prompt = `${context}`;

        const response = await ai.models.generateContent({
            model: INFERENCE_MODEL_TEXT,
            contents: prompt,
        });

        return response.text ?? "O mestre não respondeu.";
    } catch (err) {
        console.error("Erro no generateText Gemini:", err);
        return "O mestre não pôde responder agora, tente novamente mais tarde.";
    }
}

export async function generateImage(context: string) {
    try {
        // Exemplo simples de geração de imagem, se o Gemini suportar multimodal
        const response = (await ai.models.generateContent({
            model: INFERENCE_MODEL_IMAGE, // ajuste para o modelo de imagens do Gemini
            contents: context,
            UI: {
                responseModalities: ["Image"],
            },
        })) as { imageUrl?: string };

        // retornar url da imagem ou placeholder
        return response.imageUrl ?? IMAGE_PLACEHOLDER_URL;
    } catch (err) {
        console.error("Erro no generateImage Gemini:", err);
        return IMAGE_PLACEHOLDER_URL;
    }
}
