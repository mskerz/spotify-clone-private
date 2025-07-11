/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumnber" TEXT;
