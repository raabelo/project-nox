"use client";

import { UI } from "@/utils/global/constants/ui.config";
import Link from "next/link";
import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    text?: string;
    color?: string;
    href?: string;
    children?: React.ReactNode;
}

export default function Button({
    icon,
    text,
    color = UI.DEFAULT_COLOR,
    href,
    children,
    ...props
}: ButtonProps) {
    const [isFocused, setIsFocused] = useState(false);

    const isLink = Boolean(href);

    if (isLink) {
        return (
            <Link
                href={href as string}
                {...(props as any)}
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                className={`relative p-2 h-fit cursor-pointer ${
                    icon && !text ? "aspect-square" : "py-1.5 px-3"
                } rounded-md flex flex-row items-center gap-2 border transition-all ${
                    props.className
                }`}
                style={{
                    borderColor: color,                    
                    color: color,
                }}
            >
                <div
                    className={`absolute top-0 left-0 transition-all size-full ${
                        isFocused ? "opacity-20" : "opacity-10"
                    }`}
                    style={{ backgroundColor: color }}
                />
                {icon}
                {text && <span className="text-sm">{text}</span>}
                {children}
            </Link>
        );
    }

    return (
        <button
            {...props}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={`relative p-2 h-fit cursor-pointer ${
                icon && !text ? "aspect-square" : "py-1.5 px-3"
            } rounded-md flex flex-row items-center gap-2 border transition-all ${props.className}`}
            style={{
                borderColor: color,
                color: color,
            }}
        >
            <div
                className={`absolute top-0 left-0 transition-all size-full ${
                    isFocused ? "opacity-20" : "opacity-10"
                }`}
                style={{ backgroundColor: color }}
            />
            {icon}
            {text && <span className="text-sm">{text}</span>}
            {children}
        </button>
    );
}
