import useAuthSignIn from "@/hooks/useAuthSignIn";
import AuthForm from "../molecules/AuthForm";
import { useRouter } from "next/navigation";

interface SignInFormProps {
    isActive: boolean;
    toggleActive: (method: "in" | "up") => void;
}

const toggleActiveMethod = "in";

export default function SignInForm({ isActive, toggleActive }: SignInFormProps) {
    const router = useRouter()
    const { signIn, isLoading } = useAuthSignIn();

    const fields = [
        {
            name: "identifier",
            label: "Email address or nickname",
            type: "text",
            placeholder: "Email or nickname",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
            required: true,
        },
    ];

    async function handleSubmit(formData: Record<string, string>) {
        await signIn({
            identifier: formData.identifier,
            password: formData.password,
        }).then(res => {
            router.push("/inn")
        });
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
                onClick: () => console.log("Forgot password clicked"),
            }}
        />
    );
}
