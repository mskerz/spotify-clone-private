import prisma from "../src/libs/prisma";

async function main() {
  const categories = [
    { name: "ลูกทุ่ง" },
    { name: "ป็อป" },
    { name: "ฮิปฮอป" },
    { name: "ร็อก" },
    { name: "อาร์แอนด์บี" },
    { name: "อัลเทอร์เนทีฟ" },
  ];

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
    console.log("✅ Seeding category เสร็จแล้ว!");
}


main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });