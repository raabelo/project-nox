import Button from "../atoms/Button";
import { useFormFields } from "@/hooks/useFormFields";
import { FormEvent } from "react";
import { InputProps } from "../atoms/Input";

interface AuthFormProps {
    isActive: boolean;
    toggleActive: (method: "in" | "up") => void;
    formPrefix: string;
    title: string;
    fieldsConfig: InputProps[];
    onSubmit: (formData: Record<string, string>) => Promise<void> | void;
    submitLabel: string;
    loadingLabel?: string;
    isLoading?: boolean;
    secondaryAction?: {
        label: string;
        onClick?: () => void;
    };
    method: "in" | "up";
}

export default function AuthForm({
    isActive,
    toggleActive,
    formPrefix,
    title,
    fieldsConfig,
    onSubmit,
    submitLabel,
    loadingLabel = "Loading...",
    isLoading = false,
    secondaryAction,
    method,
}: AuthFormProps) {
    const { fields, formData, validateFields } = useFormFields(formPrefix, fieldsConfig);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const valid = validateFields();
        if (!valid) return;

        await onSubmit(formData);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-4 rounded-xl transition-all bg-background-light ${
                isActive ? "px-10 py-12" : ""
            }`}
        >
            {isActive ? (
                <>
                    <h2 className="text-xl font-semibold mb-2 text-center">{title}</h2>
                    <div className="flex flex-col gap-5">{fields}</div>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="submit"
                            text={isLoading ? loadingLabel : submitLabel}
                            disabled={isLoading}
                            className="text-foreground! bg-linear-to-r from-primary to-secondary"
                        />

                        {secondaryAction && (
                            <Button
                                textonly
                                type="button"
                                text={secondaryAction.label}
                                onClick={secondaryAction.onClick}
                                className="text-foreground! text-xs!"
                            />
                        )}
                    </div>
                </>
            ) : (
                <button
                    type="button"
                    className="size-60 aspect-square p-2"
                    onClick={() => toggleActive(method)}
                />
            )}
        </form>
    );
}
