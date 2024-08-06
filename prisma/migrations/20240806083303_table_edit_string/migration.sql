-- AlterTable
ALTER TABLE `Creativity` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `LifeSkills` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Opportunity` MODIFY `description` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `SpokenEnglish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `review` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
