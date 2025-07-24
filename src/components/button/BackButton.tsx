"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

function BackButton( {backToHome = false} : {backToHome?: boolean}) {
  const navigate = useRouter();
  return (
    <Button
      onClick={() => backToHome ? navigate.push("/") : navigate.back()}
      className="hover:bg-accent rounded-full bg-transparent"
    >
      <ChevronLeft className="text-foreground" />
    </Button>
  );
}
export default BackButton;
