/*
  Warnings:

  - You are about to drop the column `projectId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_PersonToProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToProject" DROP CONSTRAINT "_PersonToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToProject" DROP CONSTRAINT "_PersonToProject_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "projectId",
ADD COLUMN     "project_id" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "personId" INTEGER;

-- DropTable
DROP TABLE "_PersonToProject";

-- CreateTable
CREATE TABLE "_PersonToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToProduct_AB_unique" ON "_PersonToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToProduct_B_index" ON "_PersonToProduct"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_personId_fkey" FOREIGN KEY ("personId") REFERENCES "directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToProduct" ADD CONSTRAINT "_PersonToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "directory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToProduct" ADD CONSTRAINT "_PersonToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
