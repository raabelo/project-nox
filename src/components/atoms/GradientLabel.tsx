interface GradientLabelProp {
    text: string;
    icon: React.ReactNode;
}

export default function GradientLabel({ text }: GradientLabelProp) {
    return (
        <div className="bg-linear-to-r text-sm py-2 pl-6 pr-40 from-background to-background/0 text-foreground flex flex-row">
            <span className="max-w-60 line-clamp-2">{text}</span>
        </div>
    );
}
