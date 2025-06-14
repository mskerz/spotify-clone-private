/*
  Warnings:

  - Added the required column `releaseDate` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "releaseDate" TIMESTAMP(3) NOT NULL;
