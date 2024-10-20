/*
  Warnings:

  - A unique constraint covering the columns `[courseCode,department_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[institute_id,code]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseCode` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_department_id_key" ON "Course"("courseCode", "department_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_code_key" ON "Department"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Department_institute_id_code_key" ON "Department"("institute_id", "code");
