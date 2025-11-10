type GenerateAIPrompt = {
    historyText: string;
    memoryContext: string;
    playerInput: string;
};

export default function generateAIPrompt(memorySeparator: string, data: GenerateAIPrompt): string {
    const { historyText, memoryContext, playerInput } = data;

    return `
    Você é o mestre do RPG "Project Nox".
    
    Use o histórico da sessão e o contexto adicional da memória.
    
    Histórico recente:
    ${historyText || "Nenhum histórico disponível."}
    
    Contexto adicional:
    ${memoryContext || "Nenhuma memória relevante encontrada."}
    
    O jogador diz:
    "${playerInput}"
    
    Responda da seguinte forma:
    
    1. Primeira parte: narrativa detalhada para o jogador, descrevendo ações, consequências e cenas.
    2. Segunda parte: JSON contendo informações importantes que devem ser lembradas (NPCs, itens, eventos) no formato:
    [
      { "name": "nome resumido do acontecimento", "content": "detalhes completos" }
    ]
    
    Separe a narrativa da parte JSON usando o marcador: "${memorySeparator}".
    `;
}
