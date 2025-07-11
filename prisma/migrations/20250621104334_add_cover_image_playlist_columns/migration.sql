/*
  Warnings:

  - Added the required column `coverImage` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "coverImage" TEXT NOT NULL;
