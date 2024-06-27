/*
  Warnings:

  - You are about to drop the `Fine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fine" DROP CONSTRAINT "Fine_loan_id_fkey";

-- DropTable
DROP TABLE "Fine";

-- CreateTable
CREATE TABLE "fines" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "loan_id" INTEGER NOT NULL,

    CONSTRAINT "fines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fines_loan_id_key" ON "fines"("loan_id");

-- AddForeignKey
ALTER TABLE "fines" ADD CONSTRAINT "fines_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
