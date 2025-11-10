"use client";

import { useCountUsers } from "@/hooks/useCountUsers";
import { UI } from "@/utils/global/constants/ui.config";
import Spinner from "../atoms/Spinner";

interface UsersCounterProps {
    color?: string;
}

export default function UsersCounter({ color = UI.PRIMARY_COLOR }: UsersCounterProps) {
    const { count, loading, error } = useCountUsers();

    return (
        <div
            className={`relative py-1 px-2 h-fit w-auto rounded-md flex flex-row items-center gap-2 border transition-all text-foreground`}
            style={{
                borderColor: color,
                minWidth: "1.5rem",
            }}
        >
            <div
                className={`absolute top-0 left-0 transition-all size-full opacity-20`}
                style={{ backgroundColor: color }}
            />
            {loading ? <Spinner /> : count?.toLocaleString() ?? "0"}
        </div>
    );
}
