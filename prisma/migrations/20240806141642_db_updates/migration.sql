/*
  Warnings:

  - You are about to drop the column `url` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `imgurl` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producturl` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InterviewTraining` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `LifeSkills` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `News` MODIFY `imgurl` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Shop` DROP COLUMN `url`,
    ADD COLUMN `imgurl` TEXT NOT NULL,
    ADD COLUMN `producturl` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `SpokenEnglish` MODIFY `url` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `WorkShop` MODIFY `url` TEXT NOT NULL;
