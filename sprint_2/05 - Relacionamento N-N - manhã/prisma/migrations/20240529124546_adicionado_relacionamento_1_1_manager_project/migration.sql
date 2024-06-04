/*
  Warnings:

  - A unique constraint covering the columns `[managerId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "managerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_managerId_key" ON "Project"("managerId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
