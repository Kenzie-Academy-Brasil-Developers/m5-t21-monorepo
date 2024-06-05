/*
  Warnings:

  - You are about to drop the column `ownerId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `devId` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_ownerId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "ownerId",
ADD COLUMN     "devId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Dev"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
