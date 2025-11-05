import { UI } from "@/utils/global/constants/ui.config";
import { PlayerCharacter } from "@prisma/client";
import Image from "next/image";

const PLACEHOLDER_IMAGE_URL =
    "https://i.pinimg.com/1200x/b0/a2/86/b0a2866ccb0fac1007853aea85e43b84.jpg";

interface CharacterPortraitProps {
    character: PlayerCharacter;
}

export default function CharacterProtrait({ character }: CharacterPortraitProps) {
    if (!character) {
        return <div>No character</div>;
    }

    return (
        <div
            className="relative border-2 rounded-2xl w-20 p-1"
            style={{
                borderColor: character.uiColor || UI.PRIMARY_COLOR,
            }}
        >
            <div className="size-2.5 absolute top-1 right-1 rounded-full bg-green-400" />
            <Image
                alt={`${character.name}-portrait`}
                src={PLACEHOLDER_IMAGE_URL}
                width={1080}
                height={1080}
                className="aspect-square object-cover object-top w-full rounded-xl"
            />
            <div>{character.name}</div>
        </div>
    );
}
