"use client"

import { useState } from "react";

import PageWrapper from "@/components/organisms/PageWrapper";
import SignInForm from "@/components/organisms/SignInForm";
import SignUpForm from "@/components/organisms/SignUpForm";

export default function AuthPage() {
    const [currentAuthMethod, setCurrentAuthMethod] = useState<"in" | "up">("in");

    function handleToggle(method: "in" | "up") {
        setCurrentAuthMethod(method);
    }

    return (
        <PageWrapper>
            <div className="flex items-center justify-center min-h-svh w-full flex-col gap-10">
                <div className="flex flex-col xl:flex-row gap-10">
                    <SignInForm isActive={currentAuthMethod === "in"} toggleActive={() => handleToggle("in")} />
                    <SignUpForm isActive={currentAuthMethod === "up"} toggleActive={() => handleToggle("up")} />
                </div>
                <div>
                    <p>Google Login</p>
                </div>
            </div>
        </PageWrapper>
    );
}
