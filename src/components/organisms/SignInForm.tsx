import { useFormFields } from "@/hooks/useFormFields";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface SignInFormProps {
    isActive: boolean;
    toggleActive: (method: "in") => void;
}

export default function SignInForm({ isActive, toggleActive }: SignInFormProps) {
    const { fields } = useFormFields("signinform", [
        {
            name: "email",
            label: "Email address or nickname",
            type: "email",
            placeholder: "Email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
    ]);

    return (
        <form
            className={`flex flex-col gap-4 px-10 py-12 pb-14 rounded-xl transition-all ${
                isActive ? "bg-background-light" : "aspect-square size-60"
            }`}
            onClick={() => toggleActive("in")}
        >
            <h2 className="text-xl font-semibold mb-2 text-center">Sign In</h2>
            <div className="flex flex-col gap-5">{fields}</div>
            <div className="flex flex-col gap-3 mt-4">
                <Button
                    type="submit"
                    text="Login"
                    className="text-foreground! bg-linear-to-r from-primary to-secondary"
                />
                <Button
                    textonly
                    type="submit"
                    text="Forgot my password"
                    className="text-foreground! text-xs!"
                />
            </div>
        </form>
    );
}
