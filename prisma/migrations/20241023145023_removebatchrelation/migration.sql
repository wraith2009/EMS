/*
  Warnings:

  - You are about to drop the column `batch_id` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_batch_id_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batch_id";
