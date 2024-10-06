/*
  Warnings:

  - You are about to drop the column `insNumber` on the `Institute` table. All the data in the column will be lost.
  - Added the required column `contactNumber` to the `Institute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Institute" DROP COLUMN "insNumber",
ADD COLUMN     "contactNumber" TEXT NOT NULL;
