"use client";

import { useState } from "react";

import PageWrapper from "@/components/organisms/PageWrapper";
import SignInForm from "@/components/organisms/SignInForm";
import SignUpForm from "@/components/organisms/SignUpForm";
import Button from "@/components/atoms/Button";
import { IconBrandGithubFilled, IconBrandGoogleFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function AuthPage() {
    const [currentAuthMethod, setCurrentAuthMethod] = useState<"in" | "up">("in");

    function handleToggle(method: "in" | "up") {
        setCurrentAuthMethod(method);
    }

    return (
        <PageWrapper>
            <div className="flex items-center justify-center min-h-svh w-full flex-col gap-10">
                <div className="flex flex-col xl:flex-row gap-10">
                    <SignInForm
                        isActive={currentAuthMethod === "in"}
                        toggleActive={() => handleToggle("in")}
                    />
                    <SignUpForm
                        isActive={currentAuthMethod === "up"}
                        toggleActive={() => handleToggle("up")}
                    />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                    <p className="text-xs text-foreground/50 text-center">Join with</p>
                    <div className="flex flex-row gap-4">
                        <Button icon={<IconBrandGoogleFilled />} onClick={() => signIn("google")} />
                        <Button icon={<IconBrandGithubFilled />} onClick={() => signIn("github")} />
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
