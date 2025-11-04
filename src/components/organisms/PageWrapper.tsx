interface PageWrapperProps {
    isFullscreen?: boolean;
    children: React.ReactNode;
}

export default function PageWrapper({ children, isFullscreen }: PageWrapperProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className={`flex min-h-screen w-full ${
                    isFullscreen ? "" : "max-w-7xl"
                } flex-col items-center justify-between bg-white dark:bg-black sm:items-start`}
            >
                {children}
            </main>
        </div>
    );
}
