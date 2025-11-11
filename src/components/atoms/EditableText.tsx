"use client";

import { IconPencil } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface EditableTextProps extends Omit<InputProps & TextareaProps, "value" | "onChange"> {
    initialValue: string;
    fontSize?: number;
}

export default function EditableText({ initialValue, fontSize = 16, ...props }: EditableTextProps) {
    const textRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [height, setHeight] = useState<number | string>(0);

    useEffect(() => {
        if (textRef.current) {
            setHeight(textRef.current.scrollHeight);
        }
    }, [value, textRef]);

    return (
        <div className="flex flex-row gap-2 w-full">
            {isEditing ? (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    className={`pb-4 ${props.className}`}
                    style={{
                        height,
                        fontSize,
                        resize: "none",
                        width: "100%",
                        borderBottom: "1px solid var(--color-primary)",
                    }}
                    {...props}
                />
            ) : (
                <div
                    ref={textRef}
                    className={`w-full cursor-text wrap-break-word ${props.className}`}
                    style={{
                        fontSize,
                    }}
                >
                    <p className="whitespace-pre-line">{value}</p>
                </div>
            )}

            <Button
                className="cursor-pointer text-secondary! shrink-0 -mt-1"
                onClick={() => setIsEditing((prev) => !prev)}
                icon={<IconPencil size={20}/>}
                textonly
            />
            
        </div>
    );
}
