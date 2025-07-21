import BackButton from "@/components/button/BackButton";
import { ChildrenProps } from "@/types/props";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Song Management",
};

function layout({ children }: ChildrenProps) {
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="me-auto">
        <h1 className="text-3xl font-bold">Song Management</h1>
        <p className="text-muted-foreground">Manage your songs here.</p>
      </div>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
}
export default layout;
