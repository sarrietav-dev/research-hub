/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CertifyingOrganization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `programs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CertifyingOrganization_name_key" ON "CertifyingOrganization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "programs_name_key" ON "programs"("name");
