/*
  Warnings:

  - The values [hod] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[teacher_id]` on the table `Hod` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacher_id` to the `Hod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('student', 'teacher', 'admin');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterEnum
ALTER TYPE "TeacherRole" ADD VALUE 'HOD';

-- AlterTable
ALTER TABLE "Hod" ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hod_teacher_id_key" ON "Hod"("teacher_id");

-- AddForeignKey
ALTER TABLE "Hod" ADD CONSTRAINT "Hod_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
