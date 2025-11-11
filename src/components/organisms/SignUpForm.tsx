"use client";

import useAuthSignUp from "@/hooks/useAuthSignUp";
import AuthForm from "../molecules/AuthForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { InputProps } from "../atoms/Input";
import {
    IconDeviceGamepad,
    IconEye,
    IconEyeClosed,
    IconLock,
    IconLockCheck,
    IconMail,
} from "@tabler/icons-react";
import { useState } from "react";

interface SignUpFormProps {
    isActive: boolean;
    toggleActive: (method: "in" | "up") => void;
}

const toggleActiveMethod = "up";

export default function SignUpForm({ isActive, toggleActive }: SignUpFormProps) {
    const router = useRouter();
    const { signUp, isLoading } = useAuthSignUp();

    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isVerifyPassVisible, setIsVerifyPassVisible] = useState(false);

    const IconPasswordEye = isPassVisible ? IconEye : IconEyeClosed;

    const fields: InputProps[] = [
        {
            name: "nickname",
            label: "Nickname",
            type: "text",
            placeholder: "John Doe",
            required: true,
            icon: <IconDeviceGamepad size={16} />,
        },
        {
            name: "email",
            label: "Email address",
            type: "email",
            placeholder: "example@email.com",
            required: true,
            icon: <IconMail size={16} />,
        },
        {
            name: "password",
            label: "Password",
            type: isPassVisible ? "text" : "password",
            placeholder: "Your password",
            required: true,
            icon: <IconLock size={16} />,
            after: (
                <button type="button" onClick={() => setIsPassVisible((prev) => !prev)}>
                    <IconPasswordEye size={16} />
                </button>
            ),
        },
        {
            name: "confirm-password",
            label: "Confirm password",
            type: isVerifyPassVisible ? "text" : "password",
            placeholder: "Repeat your password",
            required: true,
            icon: <IconLockCheck size={16} />,
            after: (
                <button type="button" onClick={() => setIsVerifyPassVisible((prev) => !prev)}>
                    <IconPasswordEye size={16} />
                </button>
            ),
        },
    ];

    async function handleSubmit(formData: Record<string, string>) {
        try {
            const res = await signUp({
                nickname: formData.nickname,
                email: formData.email,
                password: formData.password,
            });

            toast.success("Account created successfully!");
            router.push("/inn");
        } catch (err) {
            toast.error("Failed to register");
            console.error(err);
        }
    }

    return (
        <AuthForm
            isActive={isActive}
            toggleActive={toggleActive}
            method={toggleActiveMethod}
            formPrefix="signupform"
            title="Sign Up"
            fieldsConfig={fields}
            onSubmit={handleSubmit}
            submitLabel="Register"
            loadingLabel="Registering..."
            isLoading={isLoading}
        />
    );
}
