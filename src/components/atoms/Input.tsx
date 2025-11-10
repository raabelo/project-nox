"use client";

import React, { useRef, useEffect, useState } from "react";
import { UI } from "@/utils/global/constants/ui.config";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    icon?: React.ReactNode;
    color?: string;
    error?: string;
}

export default function Input({
    icon,
    label,
    color = UI.PRIMARY_COLOR,
    id,
    name,
    error,
    ...props
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputId, setInputId] = useState(id || "");
    const [isFocused, setIsFocused] = useState(false);
    const [formStyle, setFormStyle] = useState<CSSStyleDeclaration | null>(null);

    useEffect(() => {
        if (!id && inputRef.current) {
            const derivedId = inputRef.current.name || label.toLowerCase().replace(/\s+/g, "-");
            setInputId(derivedId);
        }

        if (inputRef.current?.form) {
            const form = inputRef.current.form;
            const style = getComputedStyle(form);
            setFormStyle(style);
        }
    }, [id, label]);

    const borderColor = error ? UI.FAILURE_COLOR : color;

    return (
        <div className="size-fit flex flex-col gap-1 relative w-full">
            <div className="flex-row gap-2 relative w-full">
                <input
                    {...props}
                    ref={inputRef}
                    name={name}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder=""
                    id={inputId}
                    className={`rounded-full border py-2 px-4 text-foreground w-full transition-colors ${props.className}`}
                    style={{
                        borderColor,
                        caretColor: color,
                    }}
                />
            </div>
            <label
                htmlFor={inputId}
                className={`font-light absolute cursor-text transition-all select-none ${
                    isFocused || props.value
                        ? "-top-2 left-3 text-xs px-1.5 text-foreground"
                        : "left-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50"
                }`}
                style={{
                    backgroundColor: formStyle?.backgroundColor,
                }}
            >
                {icon} {label}{" "}
                {!props.required && (
                    <span
                        className={`opacity-50 transition-all ${
                            isFocused || props.value ? "text-[0.60rem]" : "text-[0.75rem]"
                        }`}
                    >
                        {" (optional) "}
                    </span>
                )}
            </label>

            {error && (
                <span className="text-xs text-failure absolute -bottom-4 left-4">{error}</span>
            )}
        </div>
    );
}
