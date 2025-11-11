"use client"

import { IconBrandGithub, IconCoinFilled } from "@tabler/icons-react";
import Button from "../atoms/Button";
import { APP } from "@/utils/global/constants/app.config";
import { UI } from "@/utils/global/constants/ui.config";
import { useUserContext } from "@/contexts/SessionUserContext";
import UserPortrait from "../molecules/UserPortrait";

export default function HomeHeader() {
    const { user } = useUserContext();

    console.log(user)

    return (
        <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row gap-2 items-center">
                <Button icon={<IconBrandGithub />} href={APP.REPOSITORY_URL} target="_blank" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Button
                    icon={<IconCoinFilled size={20} />}
                    text={"Pricing"}
                    color={UI.SECONDARY_COLOR}
                />
                {user ? (
                    <UserPortrait size={40} borderWidth={2} user={user} />
                ) : (
                    <Button text={"Sign In"} href="/auth" />
                )}
            </div>
        </div>
    );
}
