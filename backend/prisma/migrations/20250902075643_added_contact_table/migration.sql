/*
  Warnings:

  - You are about to drop the column `published` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "published";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
