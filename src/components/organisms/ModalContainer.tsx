"use client";

import { useModal } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";

export default function ModalContainer() {
    const { content, isOpen, closeModal } = useModal();

    if (!isOpen) {
        return;
    }

    return (
        <div className="top-0 left-0 fixed h-svh w-svw flex items-center justify-center">
            <div
                onClick={closeModal}
                className="absolute top-0 left-0 bg-background/90 size-full"
            />
            <div className="absolute -translate-1/2 top-1/2 left-1/2 bg-background-light rounded-xl max-h-[80%] max-w-[80%] xl:max-w-[60%] overflow-x-hidden overflow-y-auto">
                <div className="sticky top-0 w-full h-0">
                    <button
                        onClick={closeModal}
                        className="absolute top-[0.75svw] right-[0.75svw] ml-auto z-10"
                    >
                        <IconX className="text-foreground mix-blend-difference opacity-75 " />
                    </button>
                </div>
                {content}
            </div>
        </div>
    );
}
