import { APP } from "@/utils/global/constants/app.config";

export default function HeroTitle() {
    return (
        <h1 className="text-5xl font-bold uppercase bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            {APP.NAME}
        </h1>
    );
}
