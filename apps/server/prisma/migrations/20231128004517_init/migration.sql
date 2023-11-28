-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Local', 'International');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('Finished', 'InProgress');

-- CreateTable
CREATE TABLE "seed_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT,
    "research_group_id" INTEGER NOT NULL,
    "research_lines" TEXT[],
    "description" TEXT NOT NULL,
    "program_id" INTEGER NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seed_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leader_record" (
    "id" SERIAL NOT NULL,
    "seed_group_id" INTEGER NOT NULL,
    "leader_id" INTEGER NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "leader_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "co_researcher_record" (
    "id" SERIAL NOT NULL,
    "seed_group_id" INTEGER NOT NULL,
    "co_researcher_id" INTEGER NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "co_researcher_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_record" (
    "id" SERIAL NOT NULL,
    "seed_group_id" INTEGER,
    "member_id" INTEGER,
    "period" TEXT NOT NULL,
    "affiliation_date" TIMESTAMP(3) NOT NULL,
    "functions" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "membership_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identity_card" TEXT NOT NULL,
    "institutional_code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "program_id" INTEGER NOT NULL,

    CONSTRAINT "directory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "membership_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "research_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "research_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "type" "EventType" NOT NULL,
    "seed_group_id" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProjectStatus" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "certifying_organization_id" INTEGER NOT NULL,
    "approved_amount" DOUBLE PRECISION NOT NULL,
    "seedGroupId" INTEGER NOT NULL,

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
    "date" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER,
    "productTypesId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "associated_person_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "directory_identity_card_key" ON "directory"("identity_card");

-- CreateIndex
CREATE UNIQUE INDEX "directory_institutional_code_key" ON "directory"("institutional_code");

-- CreateIndex
CREATE UNIQUE INDEX "directory_email_key" ON "directory"("email");

-- CreateIndex
CREATE UNIQUE INDEX "directory_phone_key" ON "directory"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToProject_AB_unique" ON "_PersonToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToProject_B_index" ON "_PersonToProject"("B");

-- AddForeignKey
ALTER TABLE "seed_groups" ADD CONSTRAINT "seed_groups_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seed_groups" ADD CONSTRAINT "seed_groups_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_record" ADD CONSTRAINT "leader_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_record" ADD CONSTRAINT "leader_record_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "co_researcher_record" ADD CONSTRAINT "co_researcher_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "co_researcher_record" ADD CONSTRAINT "co_researcher_record_co_researcher_id_fkey" FOREIGN KEY ("co_researcher_id") REFERENCES "directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_record" ADD CONSTRAINT "membership_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_record" ADD CONSTRAINT "membership_record_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "directory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_record" ADD CONSTRAINT "membership_record_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "membership_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "directory" ADD CONSTRAINT "directory_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_certifying_organization_id_fkey" FOREIGN KEY ("certifying_organization_id") REFERENCES "CertifyingOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_seedGroupId_fkey" FOREIGN KEY ("seedGroupId") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypesId_fkey" FOREIGN KEY ("productTypesId") REFERENCES "product_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_associated_person_id_fkey" FOREIGN KEY ("associated_person_id") REFERENCES "directory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToProject" ADD CONSTRAINT "_PersonToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "directory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToProject" ADD CONSTRAINT "_PersonToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
