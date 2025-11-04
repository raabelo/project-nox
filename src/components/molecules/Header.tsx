import { IconBrandGithub, IconCoinFilled } from "@tabler/icons-react";
import Button from "../atoms/Button";
import { APP } from "@/utils/global/constants/app.config";

export default function Header() {
    return (
        <div className="flex flex-row justify-between p-4 w-full items-center">
            <div className="flex flex-row gap-2 items-center">
                <Button icon={<IconBrandGithub />} href={APP.REPOSITORY_URL} />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Button icon={<IconCoinFilled size={20} />} text={"Pricing"} />
                <Button text={"Sign In"} />
            </div>
        </div>
    );
}
