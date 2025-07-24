import { Metadata } from "next";
import BackButton from "@/components/button/BackButton";
import { ChildrenProps } from "@/types/props";

export const metadata: Metadata = {
  title: "Profile",
};

function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6">
      {/* Back button section */}
      <div className="mb-6 w-full max-w-3xl">
        <div className="flex items-center space-x-2">
          <BackButton backToHome />
         
        </div>
      </div>

      {/* Content section */}
      <div className="w-full max-w-3xl">{children}</div>
    </div>
  );
}

export default Layout;
