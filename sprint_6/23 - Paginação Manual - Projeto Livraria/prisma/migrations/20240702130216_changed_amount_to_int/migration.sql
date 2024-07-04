/*
  Warnings:

  - You are about to alter the column `amount` on the `fines` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `amount` on the `loans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "fines" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "loans" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
