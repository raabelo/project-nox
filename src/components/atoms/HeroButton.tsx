import { IconChevronRight } from "@tabler/icons-react";
import Button, { ButtonProps } from "./Button";

export default function HeroButton({ icon, text }: ButtonProps) {
    return (
        <Button
            className="px-8! py-7! rounded-2xl! text-2xl! gap-4! bg-linear-to-r from-primary to-secondary text-background! font-bold"
            icon={icon}
            text={text}
        >
            <IconChevronRight stroke={3} className="-ml-1" />
        </Button>
    );
}
