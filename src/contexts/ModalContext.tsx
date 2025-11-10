"use client"

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    FC,
} from "react";

type ModalContent = ReactNode | null;

export interface ModalOptions {
    title?: string;
}

interface ModalContextType {
    isOpen: boolean;
    content: ModalContent;
    options: ModalOptions | null;
    openModal: (content: ReactNode, options?: ModalOptions) => void;
    closeModal: () => void;
    setContent: (content: ReactNode | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ModalContent>(null);
    const [options, setOptions] = useState<ModalOptions | null>(null);

    const isOpen = content !== null;

    const openModal = useCallback((node: ReactNode, opts?: ModalOptions) => {
        setContent(node);
        setOptions(opts ?? null);
    }, []);

    const closeModal = useCallback(() => {
        setContent(null);
        setOptions(null);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, closeModal]);

    const value = useMemo(
        () => ({
            isOpen,
            content,
            options,
            openModal,
            closeModal,
            setContent,
        }),
        [isOpen, content, options, openModal, closeModal]
    );

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export function useModal(): ModalContextType {
    const ctx = useContext(ModalContext);
    if (!ctx) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return ctx;
}
