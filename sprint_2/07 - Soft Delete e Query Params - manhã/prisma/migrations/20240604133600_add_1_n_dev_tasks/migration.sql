/*
  Warnings:

  - Added the required column `devId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "devId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Dev"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
