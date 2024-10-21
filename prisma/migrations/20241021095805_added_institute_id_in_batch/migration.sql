/*
  Warnings:

  - Added the required column `institute_id` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "institute_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
