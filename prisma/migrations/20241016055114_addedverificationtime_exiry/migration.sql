-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ResetPasswordTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "VerificationTOkenExpiry" TIMESTAMP(3);
