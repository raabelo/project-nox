import { User } from "@prisma/client";
import HeroTitle from "../atoms/HeroTitle";
import UserPortrait from "../molecules/UserPortrait";
import { IconChevronDown } from "@tabler/icons-react";
import Button from "../atoms/Button";

const userPlaceholder: User = {
    id: "clskf08x7000010s11b23g73n",
    nickname: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: "https://i.pinimg.com/736x/f5/98/74/f59874969e7683625f11bf4477ac87e3.jpg",
    password: "asd",
};

export default function InnHeader() {
    return (
        <div id="header" className="w-full flex flex-row justify-between items-center">
            <section className="flex flex-row flex-2 justify-start items-center">
                <UserPortrait size={10} user={userPlaceholder} />
            </section>
            <section className="flex flex-row flex-6 justify-center items-center">
                <Button textonly>
                    <HeroTitle size="1.5rem" />
                    </Button>
            </section>
            <section className="flex flex-row flex-2 justify-end items-center">
                <button type="button" className="flex flex-row items-center cursor-pointer">
                    <UserPortrait size={40} borderWidth={2} user={userPlaceholder} />
                    <IconChevronDown size={20} className="mt-1 text-foreground/50"/>
                </button>
            </section>
        </div>
    );
}
