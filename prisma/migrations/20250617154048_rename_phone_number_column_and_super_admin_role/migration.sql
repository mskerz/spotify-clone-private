/*
  Warnings:

  - You are about to drop the column `phoneNumnber` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "phoneNumnber",
ADD COLUMN     "phoneNumber" TEXT;
