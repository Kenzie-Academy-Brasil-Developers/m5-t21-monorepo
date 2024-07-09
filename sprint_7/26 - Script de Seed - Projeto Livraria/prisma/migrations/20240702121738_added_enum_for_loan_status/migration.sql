/*
  Warnings:

  - The `status` column on the `loans` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `return_date` on table `loans` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('ACTIVE', 'RETURNED', 'CANCELLED');

-- AlterTable
ALTER TABLE "loans" ALTER COLUMN "return_date" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'ACTIVE';
