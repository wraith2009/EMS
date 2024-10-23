/*
  Warnings:

  - You are about to drop the column `batch_id` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_batch_id_fkey";

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "batch_id";

-- DropTable
DROP TABLE "Batch";
