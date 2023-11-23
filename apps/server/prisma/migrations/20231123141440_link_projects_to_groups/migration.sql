/*
  Warnings:

  - You are about to drop the column `seed_group_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `Project` table. All the data in the column will be lost.
  - Added the required column `seedGroupId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ProjectStatus" ADD VALUE 'InProgress';

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_seed_group_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "seed_group_id",
ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "products",
ADD COLUMN     "seedGroupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_seedGroupId_fkey" FOREIGN KEY ("seedGroupId") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
