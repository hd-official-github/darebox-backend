/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Productivity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Productivity_userId_key` ON `Productivity`(`userId`);
