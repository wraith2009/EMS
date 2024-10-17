/*
  Warnings:

  - You are about to drop the column `VerificationTOkenExpiry` on the `User` table. All the data in the column will be lost.
  - Made the column `isvarified` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "VerificationTOkenExpiry",
ADD COLUMN     "VerificationTokenExpiry" TIMESTAMP(3),
ALTER COLUMN "isvarified" SET NOT NULL,
ALTER COLUMN "isvarified" SET DEFAULT false;
