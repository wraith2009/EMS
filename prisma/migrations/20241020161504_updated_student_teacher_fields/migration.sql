/*
  Warnings:

  - You are about to drop the column `enrollment_year` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enrollmentNumber,institute_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateOfBirth` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollmentNumber` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employementStartDate` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectSpecialization` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('Lecturer', 'AssistantProfessor', 'Professor');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('Active', 'Graduated', 'Dropped_Out');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "enrollment_year",
ADD COLUMN     "CurrentSemester" TEXT,
ADD COLUMN     "CurrentYear" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "enrollmentNumber" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "rollNumber" TEXT,
ADD COLUMN     "status" "StudentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "employementStartDate" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL,
ADD COLUMN     "role" "TeacherRole" NOT NULL,
ADD COLUMN     "subjectSpecialization" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentNumber_institute_id_key" ON "Student"("enrollmentNumber", "institute_id");
