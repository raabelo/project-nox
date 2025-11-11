"use client"

import HeroTitle from "../atoms/HeroTitle";
import UserPortrait from "../molecules/UserPortrait";
import { IconChevronDown } from "@tabler/icons-react";
import Button from "../atoms/Button";
import { useUserContext } from "@/contexts/SessionUserContext";

export default function InnHeader() {
    const { user } = useUserContext();

    return (
        <div id="header" className="w-full flex flex-row justify-between items-center">
            <section className="flex flex-row flex-2 justify-start items-center">
                {/* <UserPortrait size={10} user={user} /> */}
            </section>
            <section className="flex flex-row flex-6 justify-center items-center">
                <Button textonly>
                    <HeroTitle size="1.5rem" />
                </Button>
            </section>
            <section className="flex flex-row flex-2 justify-end items-center">
                <button type="button" className="flex flex-row items-center cursor-pointer">
                    <UserPortrait size={40} borderWidth={2} user={user} />
                    <IconChevronDown size={20} className="mt-1 text-foreground/50" />
                </button>
            </section>
        </div>
    );
}
