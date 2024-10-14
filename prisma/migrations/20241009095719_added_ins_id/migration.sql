/*
  Warnings:

  - You are about to drop the column `address` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `insEmail` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Institute` table. All the data in the column will be lost.
  - You are about to drop the column `reg_no` on the `Institute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `Institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institute_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `Hod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institute_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Institute_reg_no_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "institute_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hod" ADD COLUMN     "institute_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Institute" DROP COLUMN "address",
DROP COLUMN "insEmail",
DROP COLUMN "name",
DROP COLUMN "reg_no",
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessaddress" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "registrationNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "institute_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "institute_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Institute_registrationNumber_key" ON "Institute"("registrationNumber");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hod" ADD CONSTRAINT "Hod_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
