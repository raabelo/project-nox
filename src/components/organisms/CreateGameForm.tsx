"use client"

import { FormEvent } from "react";
import EditableText from "../atoms/EditableText";
import Image from "next/image";
import { GameWithCharacters } from "@/types/prismaPayloads";
import CharacterProtrait from "../molecules/CharacterPortrait";
import { IconPlus } from "@tabler/icons-react";
import Button from "../atoms/Button";
import { UI } from "@/utils/global/constants/ui.config";

interface CreateGameFormProps {
    game?: GameWithCharacters;
}

const DEFAULT_CONTENT = {
    title: "A whole new world of adventures",
    description:
        "In an ancient world shaped by lost empires and forgotten wars, ruins and relics of past ages still influence the present. Magic exists but is rare and dangerous — practiced by secret orders or granted by distant gods. Humans build kingdoms atop the remains of older civilizations, while elves, dwarves, and other ancient peoples struggle to preserve what's left of their heritage.\n Conflict and mystery define the land: city-states war for power, cults worship sleeping gods, and wanderers seek forbidden knowledge in crumbling ruins. Yet even in a world bound by cycles of rise and ruin, heroes still emerge — defying fate and daring to shape a new age.",
};

export default function CreateGameForm({ game }: CreateGameFormProps) {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col rounded-xl transition-all bg-background-light h-auto min-h-[80svh] w-[90svw] xl:w-lg`}
        >
            <Image
                src={"https://i.pinimg.com/1200x/35/cb/67/35cb6735d88f76176ee17f9bff47f185.jpg"}
                draggable={false}
                alt={"game-thumbnail"}
                className="size-full object-cover aspect-video"
                width={368}
                height={368}
            />
            <div className="flex flex-col gap-4 p-4">
                <EditableText
                    name="title"
                    initialValue={game?.title || DEFAULT_CONTENT.title}
                    className="font-bold sticky top-0"
                    fontSize={20}
                />
                <EditableText
                    name="description"
                    initialValue={game?.description || DEFAULT_CONTENT.description}
                    fontSize={14}
                />
                <div>
                    <p className="font-bold">Adventurers</p>
                    <div className="p-2 flex flex-row flex-wrap">
                        {game?.characters?.map((char) => (
                            <CharacterProtrait character={char} key={char.id} />
                        ))}
                        {!game?.characters && <Button icon={<IconPlus />} />}
                    </div>
                </div>
            </div>
            <Button text="Start adventure!" color={UI.SECONDARY_COLOR} className="m-10 mt-4 font-bold" />
        </form>
    );
}
