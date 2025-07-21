import { auth } from "@/libs/firebase/server";
import prisma from "@/libs/prisma";

async function main() {
  const email = "superadmin@example.com";
  const password = "superadmin123456";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    console.log("User already exists, skipping creation.");
    return;
  }

  try {
    // สร้าง user บน Firebase
    const firebaseUser = await auth.createUser({
      email,
      password,
      displayName: "Super Admin",
      
    });

    await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email || "",
        role: "SUPER_ADMIN",
        userInfo: {
          create: {
            firstName: "Super",
            lastName: "Admin",
            avatarUrl: "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png",
            phoneNumber: "1234567890",
            age: 30,
          },
        },
      },
    });

    console.log("✅ SUPER_ADMIN created:", email);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error creating SUPER_ADMIN:", error.message);
    } else {
      console.error("❌ Unknown error creating SUPER_ADMIN:", error);
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
