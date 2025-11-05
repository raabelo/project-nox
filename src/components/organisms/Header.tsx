import { IconBrandGithub, IconCoinFilled } from "@tabler/icons-react";
import Button from "../atoms/Button";
import { APP } from "@/utils/global/constants/app.config";
import { UI } from "@/utils/global/constants/ui.config";

export default function Header() {
    return (
        <div className="flex flex-row justify-between p-4 w-full items-center">
            <div className="flex flex-row gap-2 items-center">
                <Button icon={<IconBrandGithub />} href={APP.REPOSITORY_URL} target="_blank" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Button icon={<IconCoinFilled size={20} />} text={"Pricing"} color={UI.SECONDARY_COLOR} />
                <Button text={"Sign In"} href="/inn/auth" />
            </div>
        </div>
    );
}
