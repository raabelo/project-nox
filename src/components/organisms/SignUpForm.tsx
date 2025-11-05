import useAuthSignUp from "@/hooks/useAuthSignUp";
import Button from "../atoms/Button";
import { useFormFields } from "@/hooks/useFormFields";
import { FormEvent } from "react";

interface SignUpFormProps {
    isActive: boolean;
    toggleActive: (method: "up") => void;
}

export default function SignUpForm({ isActive, toggleActive }: SignUpFormProps) {
    const formPrefix = "signupform";

    const { fields, formData } = useFormFields(formPrefix, [
        {
            name: "nickname",
            label: "Nickname",
            type: "text",
            placeholder: "John Doe",
        },
        {
            name: "email",
            label: "Email address",
            type: "email",
            placeholder: "example@email.com",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Your password",
        },
        {
            name: "confirm-password",
            label: "Confirm password",
            type: "password",
            placeholder: "Repeat your password",
        },
    ]);

    const { signUp, isLoading } = useAuthSignUp();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await signUp({
                nickname: formData.nickname,
                email: formData.email,
                password: formData.password,
            });

            // opcional: feedback visual ou reset do formulário
            console.log("✅ Registered successfully");
        } catch (err) {
            console.error("❌ Registration failed:", err);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 px-10 py-12 pb-14 rounded-xl transition-all ${
                isActive ? "bg-background-light" : "aspect-square size-60"
            }`}
            onClick={() => toggleActive("up")}
        >
            <h2 className="text-xl font-semibold mb-2 text-center">Sign Up</h2>

            <div className="flex flex-col gap-5">{fields}</div>

            <div className="flex flex-col gap-3 mt-4">
                <Button
                    type="submit"
                    text={isLoading ? "Registering..." : "Register"}
                    disabled={isLoading}
                    className="text-foreground! bg-linear-to-r from-primary to-secondary"
                />
            </div>
        </form>
    );
}
