"use client";

import useAuthSignIn from "@/hooks/useAuthSignIn";
import AuthForm from "../molecules/AuthForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { InputProps } from "../atoms/Input";
import { IconEye, IconEyeClosed, IconLock, IconMail } from "@tabler/icons-react";
import { useState } from "react";

interface SignInFormProps {
    isActive: boolean;
    toggleActive: (method: "in" | "up") => void;
}

const toggleActiveMethod = "in";

export default function SignInForm({ isActive, toggleActive }: SignInFormProps) {
    const router = useRouter();
    const { signIn, isLoading } = useAuthSignIn();

    const [isPassVisible, setIsPassVisible] = useState(false);

    const IconPasswordEye = isPassVisible ? IconEye : IconEyeClosed;

    const fields: InputProps[] = [
        {
            name: "identifier",
            label: "Email address or nickname",
            type: "text",
            placeholder: "Email or nickname",
            required: true,
            icon: <IconMail size={16} />,
        },
        {
            name: "password",
            label: "Password",
            type: isPassVisible ? "text" : "password",
            placeholder: "Password",
            required: true,
            icon: <IconLock size={16} />,
            after: (
                <button type="button" onClick={() => setIsPassVisible((prev) => !prev)}>
                    <IconPasswordEye size={16} />
                </button>
            ),
        },
    ];

    async function handleSubmit(formData: Record<string, string>) {
        try {
            const res = await signIn({
                identifier: formData.identifier,
                password: formData.password,
            });

            if (res?.error) {
                toast.error("Invalid credentials");
                return;
            }

            toast.success("Logged in successfully!");
            router.push("/inn");
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    }

    return (
        <AuthForm
            isActive={isActive}
            toggleActive={toggleActive}
            method={toggleActiveMethod}
            formPrefix="signinform"
            title="Sign In"
            fieldsConfig={fields}
            onSubmit={handleSubmit}
            submitLabel="Login"
            loadingLabel="Logging in..."
            isLoading={isLoading}
            secondaryAction={{
                label: "Forgot my password",
                onClick: () => console.log("TODO: Forgot password clicked"),
            }}
        />
    );
}
