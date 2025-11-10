import { useMemo, useState, useCallback, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "@/components/atoms/Input";

interface UseFormFieldsReturn {
    fields: ReactElement[];
    formData: Record<string, string>;
    errors: Record<string, string>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    validateFields: () => boolean;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const PREFIX_SEPARATOR = "---"

export function useFormFields(prefix: string, fieldsConfig: InputProps[]): UseFormFieldsReturn {
    const [formData, setFormData] = useState<Record<string, string>>(
        Object.fromEntries(fieldsConfig.map((f) => [f.name, ""]))
    );
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = event.target;
        name = name.split(PREFIX_SEPARATOR)[1]

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }, []);

    const validateFields = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};

        fieldsConfig.forEach((field) => {
            const value = formData[field.name]?.trim();
            if (field.required && !value) {
                newErrors[field.name] = "This field is required";
            } else if (field.type === "email" && value && !value.includes("@")) {
                newErrors[field.name] = "Invalid email address";
            }
        });

        if (formData["password"] && formData["confirm-password"]) {
            if (formData["password"] !== formData["confirm-password"]) {
                newErrors["confirm-password"] = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [fieldsConfig, formData]);

    const renderedFields = useMemo(() => {
        return fieldsConfig.map((field) => (
            <Input
                key={field.name}
                name={`${prefix}${PREFIX_SEPARATOR}${field.name}`}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className={`border rounded p-2 ${field.className ?? ""}`}
                icon={field.icon}
                color={field.color}
                value={formData[field.name] ?? ""}
                onChange={handleChange}
                error={errors[field.name]}
            />
        ));
    }, [fieldsConfig, formData, handleChange, errors]);

    return { fields: renderedFields, formData, errors, handleChange, validateFields, setFormData };
}
