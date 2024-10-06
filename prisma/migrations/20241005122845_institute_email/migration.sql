/*
  Warnings:

  - Added the required column `insEmail` to the `Institute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institute" ADD COLUMN     "insEmail" TEXT NOT NULL;
