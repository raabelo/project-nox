import Header from "./Header";

interface PageWrapperProps {
    isFullscreen?: boolean;
    withHeader?: boolean;
    children: React.ReactNode;
}

export default function PageWrapper({ children, withHeader, isFullscreen }: PageWrapperProps) {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center font-sans bg-background">
            {withHeader && (
                <header id="header" className="w-full p-4">
                    <Header />
                </header>
            )}
            <main
                className={`flex min-h-svh w-full ${
                    isFullscreen ? "" : "max-w-7xl"
                } flex-col items-center justify-between bg-background sm:items-start`}
            >
                {children}
            </main>
        </div>
    );
}
