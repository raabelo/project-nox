import { APP } from "@/utils/global/constants/app.config";

export default function HeroTitle() {
    return <h1 className="text-5xl font-bold uppercase">{APP.NAME}</h1>;
}
