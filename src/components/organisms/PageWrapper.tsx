import { useModal } from "@/contexts/ModalContext";
import ModalContainer from "./ModalContainer";

interface PageWrapperProps {
    isFullscreen?: boolean;
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function PageWrapper({ children, header, isFullscreen }: PageWrapperProps) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-background relative">
            {header && (
                <header id="header" className="w-full p-4">
                    {header}
                </header>
            )}
            <main
                className={`flex min-h-svh w-full ${
                    isFullscreen ? "" : "max-w-7xl"
                } flex-col items-center justify-between bg-background sm:items-start`}
            >
                {children}
            </main>
            <ModalContainer />
        </div>
    );
}
