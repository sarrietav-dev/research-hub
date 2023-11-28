-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_associated_person_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "associated_person_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_associated_person_id_fkey" FOREIGN KEY ("associated_person_id") REFERENCES "directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
