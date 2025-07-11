import { ChildrenProps } from "@/types/props";

function layout({ children }: ChildrenProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex flex-col ">
        {children}
      </div>
    </div>
  );
}
export default layout;
