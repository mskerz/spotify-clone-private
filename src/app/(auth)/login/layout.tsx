import { ChildrenProps } from "@/types/props";

export default function layout({ children }: ChildrenProps) {
    return (
        <div className="container flex items-center justify-center">
            {children}
        </div>
    );
}
