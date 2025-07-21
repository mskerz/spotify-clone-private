import BackButton from "@/components/button/BackButton";
import { ChildrenProps } from "@/types/props";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Song Management",
};

function layout({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <BackButton />
          <span>Back</span>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
export default layout;
