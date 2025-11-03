import { DialogueMessage, PlayerCharacter } from "@prisma/client";

// Tipo estendido que inclui o character
export type DialogueWithCharacter = DialogueMessage & {
    character?: Pick<PlayerCharacter, "name"> | null;
};

export default function getMessageSender(message: DialogueWithCharacter): string {
    return message.role === "DUNGEON_MASTER" ? "Mestre" : message.character?.name ?? "Jogador";
}
