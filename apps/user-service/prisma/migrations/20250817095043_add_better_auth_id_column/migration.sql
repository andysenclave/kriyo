/*
  Warnings:

  - A unique constraint covering the columns `[betterAuthId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `betterAuthId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "betterAuthId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_betterAuthId_key" ON "public"."user"("betterAuthId");
