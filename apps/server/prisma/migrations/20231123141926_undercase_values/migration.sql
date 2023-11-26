/*
  Warnings:

  - The values [Local,International] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Article,Thesis,Report,Poster,Other] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Finished,InProgress] on the enum `ProjectStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [Student,Professor] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('local', 'international');
ALTER TABLE "events" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('article', 'thesis', 'report', 'poster', 'other');
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectStatus_new" AS ENUM ('finished', 'inProgress');
ALTER TABLE "Project" ALTER COLUMN "type" TYPE "ProjectStatus_new" USING ("type"::text::"ProjectStatus_new");
ALTER TYPE "ProjectStatus" RENAME TO "ProjectStatus_old";
ALTER TYPE "ProjectStatus_new" RENAME TO "ProjectStatus";
DROP TYPE "ProjectStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('student', 'professor');
ALTER TABLE "membership_record" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;
