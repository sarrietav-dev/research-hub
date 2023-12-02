/*
  Warnings:

  - You are about to drop the column `personId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `directorId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_personId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "personId",
ADD COLUMN     "directorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
