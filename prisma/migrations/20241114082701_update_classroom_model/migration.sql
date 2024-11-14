/*
  Warnings:

  - The values [hod] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `batch_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `enrollment_year` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `batch_id` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseCode,department_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[institute_id,code]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[department_id]` on the table `Hod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacher_id]` on the table `Hod` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollmentNumber,institute_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Hod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employementStartDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectSpecialization` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Active', 'Graduated', 'Dropped_Out');

-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('Lecturer', 'AssistantProfessor', 'Professor', 'HOD');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('student', 'teacher', 'admin');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_department_id_fkey";

-- DropForeignKey
ALTER TABLE "Timetable" DROP CONSTRAINT "Timetable_batch_id_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseCode" TEXT NOT NULL,
ADD COLUMN     "department_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "Hod" ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "batch_id",
DROP COLUMN "department_id",
DROP COLUMN "enrollment_year",
ADD COLUMN     "CurrentSemester" TEXT,
ADD COLUMN     "CurrentYear" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "avatar" VARCHAR(255),
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "enrollmentNumber" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "rollNumber" TEXT,
ADD COLUMN     "status" "StudentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "department_id",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "employementStartDate" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "role" "TeacherRole" NOT NULL,
ADD COLUMN     "subjectSpecialization" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "batch_id";

-- DropTable
DROP TABLE "Batch";

-- CreateTable
CREATE TABLE "ClassRoom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" TEXT,

    CONSTRAINT "ClassRoom_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "_ClassRoomStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassRoom_teacher_id_key" ON "ClassRoom"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentDepartments_AB_unique" ON "_StudentDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentDepartments_B_index" ON "_StudentDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherDepartments_AB_unique" ON "_TeacherDepartments"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherDepartments_B_index" ON "_TeacherDepartments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassRoomStudents_AB_unique" ON "_ClassRoomStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassRoomStudents_B_index" ON "_ClassRoomStudents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_department_id_key" ON "Course"("courseCode", "department_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_institute_id_code_key" ON "Department"("institute_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Hod_department_id_key" ON "Hod"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hod_teacher_id_key" ON "Hod"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentNumber_institute_id_key" ON "Student"("enrollmentNumber", "institute_id");

-- AddForeignKey
ALTER TABLE "Hod" ADD CONSTRAINT "Hod_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassRoom" ADD CONSTRAINT "ClassRoom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentDepartments" ADD CONSTRAINT "_StudentDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentDepartments" ADD CONSTRAINT "_StudentDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherDepartments" ADD CONSTRAINT "_TeacherDepartments_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassRoomStudents" ADD CONSTRAINT "_ClassRoomStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "ClassRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassRoomStudents" ADD CONSTRAINT "_ClassRoomStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
