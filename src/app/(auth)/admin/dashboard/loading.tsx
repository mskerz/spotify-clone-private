import { LoadingDots } from "@/components/common";

export default function Loading() {
  // Or a custom loading skeleton component
  return  (
    <div className="container flex items-center justify-center">
            <LoadingDots />
    </div>
  )
}