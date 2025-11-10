import { DialogMessageWithCharacter } from "@/types/prismaPayloads";
import { UI } from "@/utils/global/constants/ui.config";
import { Prisma } from "@prisma/client";

interface ChatBubbleProps {
    message: DialogMessageWithCharacter;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
    const isMaster = message.role === "DUNGEON_MASTER";

    return (
        <div className="border border-primary p-2 rounded-md">
            <p
                className="font-bold"
                style={{ color: message.character?.uiColor || UI.PRIMARY_COLOR }}
            >
                {isMaster ? "Dungeon Master" : message.character?.name || "Unknown"}
            </p>
            <p>{message.message}</p>
        </div>
    );
}
