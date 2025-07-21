import { ChildrenProps } from "@/types/props";

function layout({ children }: ChildrenProps) {
  return (
    <div className="container flex items-center justify-center">{children}</div>
  );
}
export default layout;
