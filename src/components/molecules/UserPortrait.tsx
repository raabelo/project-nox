import { User } from "@prisma/client";
import Hexagon, { HexagonProps } from "../atoms/Hexagon";
import { IconUser } from "@tabler/icons-react";
import { UI } from "@/utils/global/constants/ui.config";

interface UserPortraitProps {
    user: User | undefined;
}

export default function UserPortrait({ user, ...props }: UserPortraitProps & HexagonProps) {
    return (
        <Hexagon
            orientation="pointy"
            backgroundImage={user?.avatar || undefined}
            backgroundPosition="top"
            borderColor={UI.PRIMARY_COLOR}
            {...props}
        >
            {!user?.avatar && <IconUser size={"100%"} stroke={"7.5%"} />}
        </Hexagon>
    );
}
