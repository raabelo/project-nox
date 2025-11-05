"use client";

import React, { useRef, useEffect, useState } from "react";
import { UI } from "@/utils/global/constants/ui.config";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    icon?: React.ReactNode;
    color?: string;
}

export default function Input({
    icon,
    label,
    color = UI.PRIMARY_COLOR,
    id,
    name,
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
            console.log(style.backgroundColor);
            setFormStyle(style);
        }
    }, [id, label]);

    return (
        <div className="size-fit flex flex-col gap-1 relative">
            <div className="flex-row gap-2 relative">
                <input
                    {...props}
                    ref={inputRef}
                    name={name}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder=""
                    id={inputId}
                    className={`rounded-full border py-2 px-4 text-foreground ${
                        icon ? "pl-8" : ""
                    }`}
                    style={{
                        borderColor: color,
                        caretColor: color,
                    }}
                />
            </div>
            <label
                htmlFor={inputId}
                className={`font-light absolute cursor-text transition-all select-none ${
                    isFocused
                        ? "-top-2 left-3 text-xs px-1.5 text-foreground"
                        : "left-4 top-1/2 -translate-y-1/2 text-sm text-foreground/50"
                }`}
                style={{
                    backgroundColor: formStyle?.backgroundColor,
                }}
            >
                {icon} {label}
            </label>
        </div>
    );
}
