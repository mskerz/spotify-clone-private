import { Metadata } from "next";
import BackButton from "@/components/button/BackButton";
import { ChildrenProps } from "@/types/props";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "Spotify Private | Search",
}
function SearchLayout({ children }: ChildrenProps) {
  return (
     <div className="container flex min-h-screen flex-col items-center sm:mx-auto ">
    
       <div className="flex w-full max-w-2xl flex-col justify-center space-y-5">
         {children}
       </div>
     </div>
  );
}
export default SearchLayout;
