import { PlayerCharacter } from "@prisma/client";
import CharacterProtrait from "../molecules/CharacterPortrait";

const PLACEHOLDER_CHARACTER = {
    name: "Fab",
    id: "1231223124asd",
    userId: "asdqw",
    gameId: "1asdqwe",
    createdAt: new Date(),
    updatedAt: new Date(),
    uiColor: "#ff0000",
};

interface CharactersWindowProps {
    characters: PlayerCharacter[];
}

export default function CharactersWindow({ characters }: CharactersWindowProps) {
    characters = [PLACEHOLDER_CHARACTER, PLACEHOLDER_CHARACTER, PLACEHOLDER_CHARACTER];

    return (
        <div>
            <div className="flex flex-col gap-2">
                {characters.map((char) => (
                    <CharacterProtrait key={char.id} character={char} />
                ))}
            </div>
        </div>
    );
}
