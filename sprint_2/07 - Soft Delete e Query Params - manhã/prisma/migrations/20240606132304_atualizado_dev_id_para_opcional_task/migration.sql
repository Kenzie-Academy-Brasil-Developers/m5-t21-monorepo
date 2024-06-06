-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_devId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "devId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_devId_fkey" FOREIGN KEY ("devId") REFERENCES "Dev"("id") ON DELETE SET NULL ON UPDATE CASCADE;
