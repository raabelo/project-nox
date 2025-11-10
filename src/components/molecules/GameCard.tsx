"use client";

import { Game } from "@prisma/client";
import Image from "next/image";
import Button from "../atoms/Button";
import { useState } from "react";
import { IconCaretRightFilled } from "@tabler/icons-react";
import GradientLabel from "../atoms/GradientLabel";

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            tabIndex={0}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className="rounded-lg border border-primary relative aspect-video overflow-hidden w-full max-w-72 h-auto"
        >
            {game.thumbnail && (
                <Image
                    src={game.thumbnail}
                    draggable={false}
                    alt={`${game.id}-${game.title}-thumbnail`}
                    className="absolute top-0 left-0 size-full object-cover aspect-video"
                    width={368}
                    height={368}
                />
            )}
            <div className={`absolute top-2 transition-all ${isFocused ? "left-0" : "-left-100"}`}>
                <GradientLabel text={game.title} icon={""} />
            </div>
            <Button
                className={`absolute! bg-primary text-foreground! transition-all gap-0.5! font-bold! bottom-2 ${
                    isFocused ? "right-2" : "-right-100"
                }`}
                text="Play"
                href={`/inn/games/${game.id}`}
                icon={<IconCaretRightFilled />}
            />
        </div>
    );
}
