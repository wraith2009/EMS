/*
  Warnings:

  - You are about to drop the column `profile_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_id",
ADD COLUMN     "ResetPasswordToken" TEXT,
ADD COLUMN     "VerificationToken" TEXT;

-- DropTable
DROP TABLE "Verification";

-- DropEnum
DROP TYPE "VerificationType";
