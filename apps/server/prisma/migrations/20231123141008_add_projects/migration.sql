-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Finished');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Article', 'Thesis', 'Report', 'Poster', 'Other');

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "projectId" INTEGER;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "certifying_organization_id" INTEGER NOT NULL,
    "approved_amount" DOUBLE PRECISION NOT NULL,
    "products" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertifyingOrganization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CertifyingOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "seed_group_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_certifying_organization_id_fkey" FOREIGN KEY ("certifying_organization_id") REFERENCES "CertifyingOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
