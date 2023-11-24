/*
  Warnings:

  - Added the required column `creation_date` to the `seed_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seed_groups" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL;
