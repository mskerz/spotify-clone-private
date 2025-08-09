import { ChildrenProps } from "@/types/props";

function ResetPasswordLayout({ children }: ChildrenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
export default ResetPasswordLayout;
