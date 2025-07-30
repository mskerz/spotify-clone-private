import { SongClient } from "@/components/data/song";

export default function HomePage() {
  // ssr fetch
  return (
    <>
      <div className="flex flex-col space-y-3 ">
        {/* ฟอร์มเพิ่มเพลง */}

        <SongClient />
      </div>
    </>
  );
}
