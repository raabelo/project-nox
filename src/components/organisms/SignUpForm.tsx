import useAuthSignUp from "@/hooks/useAuthSignUp";
import AuthForm from "../molecules/AuthForm";

interface SignUpFormProps {
    isActive: boolean;
    toggleActive: (method: "in" | "up") => void;
}

const toggleActiveMethod = "up";

export default function SignUpForm({ isActive, toggleActive }: SignUpFormProps) {
    const { signUp, isLoading } = useAuthSignUp();

    const fields = [
        {
            name: "nickname",
            label: "Nickname",
            type: "text",
            placeholder: "John Doe",
            required: true,
        },
        {
            name: "email",
            label: "Email address",
            type: "email",
            placeholder: "example@email.com",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Your password",
            required: true,
        },
        {
            name: "confirm-password",
            label: "Confirm password",
            type: "password",
            placeholder: "Repeat your password",
            required: true,
        },
    ];

    async function handleSubmit(formData: Record<string, string>) {
        await signUp({
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
        });
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
