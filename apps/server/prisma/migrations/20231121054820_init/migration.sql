-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Professor');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Local', 'International');

-- CreateTable
CREATE TABLE "seed_groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT,
    "research_group_id" INTEGER NOT NULL,
    "research_lines" TEXT[],
    "description" TEXT NOT NULL,

    CONSTRAINT "seed_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leader_record" (
    "id" SERIAL NOT NULL,
    "seed_group_id" INTEGER,
    "leader_id" INTEGER,

    CONSTRAINT "leader_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "leaders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "co_researcher_record" (
    "id" SERIAL NOT NULL,
    "seed_group_id" INTEGER,
    "co_researcher_id" INTEGER,

    CONSTRAINT "co_researcher_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "co_researchers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "program_id" INTEGER NOT NULL,

    CONSTRAINT "co_researchers_pkey" PRIMARY KEY ("id")
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
    "role" "Role" NOT NULL,

    CONSTRAINT "membership_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identity_card" TEXT NOT NULL,
    "institutional_code" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
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
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL,
    "seed_group_id" INTEGER NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leaders_email_key" ON "leaders"("email");

-- CreateIndex
CREATE UNIQUE INDEX "leaders_phone_key" ON "leaders"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "co_researchers_email_key" ON "co_researchers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "co_researchers_phone_key" ON "co_researchers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "members_identity_card_key" ON "members"("identity_card");

-- CreateIndex
CREATE UNIQUE INDEX "members_institutional_code_key" ON "members"("institutional_code");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "seed_groups" ADD CONSTRAINT "seed_groups_research_group_id_fkey" FOREIGN KEY ("research_group_id") REFERENCES "research_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_record" ADD CONSTRAINT "leader_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leader_record" ADD CONSTRAINT "leader_record_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "leaders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "co_researcher_record" ADD CONSTRAINT "co_researcher_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "co_researcher_record" ADD CONSTRAINT "co_researcher_record_co_researcher_id_fkey" FOREIGN KEY ("co_researcher_id") REFERENCES "co_researchers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "co_researchers" ADD CONSTRAINT "co_researchers_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_record" ADD CONSTRAINT "membership_record_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_record" ADD CONSTRAINT "membership_record_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_seed_group_id_fkey" FOREIGN KEY ("seed_group_id") REFERENCES "seed_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
