/*
  Warnings:

  - Added the required column `program_id` to the `seed_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seed_groups" ADD COLUMN     "program_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "seed_groups" ADD CONSTRAINT "seed_groups_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
