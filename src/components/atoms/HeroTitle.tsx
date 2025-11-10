import { APP } from "@/utils/global/constants/app.config";

interface HeroTitleProps {
    size?: string;
}

export default function HeroTitle({ size }: HeroTitleProps) {
    return (
        <h1
            className="text-6xl font-bold uppercase bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
            style={{
                fontSize: size,
            }}
        >
            {APP.NAME}
        </h1>
    );
}
