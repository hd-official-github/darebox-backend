/*
  Warnings:

  - Added the required column `plan` to the `QuizResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `QuizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QuizResult` ADD COLUMN `plan` ENUM('FOUNDATION', 'TOP', 'PRO') NOT NULL,
    ADD COLUMN `type` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL;
