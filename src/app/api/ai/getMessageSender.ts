import { DialogMessage, PlayerCharacter } from "@prisma/client";

// Tipo estendido que inclui o character
export type DialogWithCharacter = DialogMessage & {
    character?: Pick<PlayerCharacter, "name"> | null;
};

export default function getMessageSender(message: DialogWithCharacter): string {
    return message.role === "DUNGEON_MASTER" ? "Mestre" : message.character?.name ?? "Jogador";
}
