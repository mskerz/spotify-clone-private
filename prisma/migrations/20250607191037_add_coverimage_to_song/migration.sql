/*
  Warnings:

  - Added the required column `coverImage` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "coverImage" TEXT NOT NULL;
