import { useMemo, useState, useCallback, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "@/components/atoms/Input";

interface UseFormFieldsReturn {
    fields: ReactElement[];
    formData: Record<string, string>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function useFormFields(prefix: string, fieldsConfig: InputProps[]): UseFormFieldsReturn {
    const [formData, setFormData] = useState<Record<string, string>>(
        Object.fromEntries(fieldsConfig.map((f) => [f.name, ""]))
    );

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const renderedFields = useMemo(() => {
        return fieldsConfig.map((field) => (
            <Input
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                className={`border rounded p-2 ${field.className ?? ""}`}
                icon={field.icon}
                color={field.color}
                value={formData[field.name] ?? ""}
                onChange={handleChange}
            />
        ));
    }, [fieldsConfig, formData, handleChange]);

    return { fields: renderedFields, formData, handleChange, setFormData };
}
