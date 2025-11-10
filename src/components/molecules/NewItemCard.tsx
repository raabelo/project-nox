"use client";

import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useModal } from "@/contexts/ModalContext";
import CreateGameForm from "../organisms/CreateGameForm";

interface NewItemCardProps {
    modalContent: React.ReactNode;
}

export default function NewItemCard({ modalContent }: NewItemCardProps) {
    const [isFocused, setIsFocused] = useState(false);
    const { openModal } = useModal();

    return (
        <button
            tabIndex={0}
            onClick={() => openModal(modalContent)}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={`rounded-lg border-4 transition-all border-dashed cursor-pointer ${
                isFocused ? "bg-background-light/50" : "bg-background-light/10"
            } text-foreground/50 border-foreground/50 flex items-center justify-center aspect-video overflow-hidden w-full max-w-72 h-auto`}
        >
            <IconPlus size={48} />
        </button>
    );
}
