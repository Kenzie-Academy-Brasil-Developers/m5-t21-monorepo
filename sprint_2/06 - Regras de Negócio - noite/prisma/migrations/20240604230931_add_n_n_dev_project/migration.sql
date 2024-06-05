-- CreateTable
CREATE TABLE "Dev" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dev_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DevToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DevToProject_AB_unique" ON "_DevToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_DevToProject_B_index" ON "_DevToProject"("B");

-- AddForeignKey
ALTER TABLE "_DevToProject" ADD CONSTRAINT "_DevToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Dev"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DevToProject" ADD CONSTRAINT "_DevToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
