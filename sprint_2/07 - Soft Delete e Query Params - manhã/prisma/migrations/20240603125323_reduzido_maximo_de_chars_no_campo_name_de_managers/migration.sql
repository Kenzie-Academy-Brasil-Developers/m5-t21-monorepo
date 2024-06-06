/*
  Warnings:

  - You are about to alter the column `name` on the `Manager` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Manager" ALTER COLUMN "name" SET DATA TYPE VARCHAR(20);
