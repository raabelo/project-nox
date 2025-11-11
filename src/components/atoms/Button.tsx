"use client";

import { UI } from "@/utils/global/constants/ui.config";
import {  IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    text?: string;
    color?: string;
    href?: string;
    target?: string;
    textonly?: boolean;
    children?: React.ReactNode;
    isLoading?: boolean;
}

export default function Button({
    icon,
    text,
    color = UI.PRIMARY_COLOR,
    href,
    textonly,
    target,
    children,
    className = "",
    isLoading = false,
    ...props
}: ButtonProps) {
    const [isFocused, setIsFocused] = useState(false);
    const isLink = Boolean(href);

    const sharedClasses = `relative p-2 text-sm text-center h-fit cursor-pointer ${
        icon && !text ? "aspect-square" : "py-1.5 px-3"
    } ${icon && text? "pl-2" : ""} rounded-full overflow-hidden flex flex-row justify-center items-center gap-2 ${
        textonly ? "" : "border"
    } transition-all ${className}`;

    const sharedStyle = {
        borderColor: color,
        color: color,
    };

    const overlay = (
        <div
            className={`absolute top-0 left-0 transition-all size-full ${
                isFocused ? "opacity-20" : "opacity-10"
            }`}
            style={{ backgroundColor: color }}
        />
    );

    const handleMouseEnter = () => setIsFocused(true);
    const handleMouseLeave = () => setIsFocused(false);

    const content = (
        <>
            {!isLoading ? (
                <>
                    {icon}
                    {text && <span>{text}</span>}
                    {children}
                    {!textonly && overlay}
                </>
            ) : (
                <IconLoader2 className="animate-spin" />
            )}
        </>
    );

    if (isLink) {
        return (
            <Link
                {...(props as any)}
                href={href as string}
                target={target}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={sharedClasses}
                style={sharedStyle}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            {...props}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={sharedClasses}
            style={sharedStyle}
        >
            {content}
        </button>
    );
}
