import { IconLoader2 } from "@tabler/icons-react";

interface SpinnerProps {
    size?: number;
    className?: string;
}

export const Spinner = ({ size = 24, className = "" }: SpinnerProps) => {
    return <IconLoader2 size={size} className={`animate-spin ${className}`} stroke={1.5} />;
};

export default Spinner;
