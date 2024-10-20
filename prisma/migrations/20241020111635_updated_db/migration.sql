/*
  Warnings:

  - You are about to drop the column `department_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[department_id]` on the table `Hod` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `department_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_department_id_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "department_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "department_id";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "department_id";

-- CreateTable
CREATE TABLE "_StudentDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeacherDepartments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StudentDepartments_AB_unique" ON "_StudentDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentDepartments_B_index" ON "_StudentDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherDepartments_AB_unique" ON "_TeacherDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherDepartments_B_index" ON "_TeacherDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Hod_department_id_key" ON "Hod"("department_id");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentDepartments" ADD CONSTRAINT "_StudentDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentDepartments" ADD CONSTRAINT "_StudentDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
