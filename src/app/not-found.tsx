import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
};
function NotFoundPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8 text-zinc-400">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#1ED760] text-white rounded-3xl font-semibold shadow-md transition-colors hover:bg-zinc-700"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
export default NotFoundPage;
