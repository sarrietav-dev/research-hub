/*
  Warnings:

  - Added the required column `program_id` to the `research_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "research_groups" ADD COLUMN     "program_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "research_groups" ADD CONSTRAINT "research_groups_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
