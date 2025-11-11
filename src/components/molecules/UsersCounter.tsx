"use client";

import { UI } from "@/utils/global/constants/ui.config";
import Spinner from "../atoms/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getUsersCount } from "@/services/user.service";

interface UsersCounterProps {
    color?: string;
}

export default function UsersCounter({ color = UI.PRIMARY_COLOR }: UsersCounterProps) {
    const { data, isLoading } = useQuery({ queryKey: ["getUser"], queryFn: getUsersCount });

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
            {isLoading ? <Spinner /> : data?.count?.toLocaleString() ?? "0"}
        </div>
    );
}
