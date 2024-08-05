-- CreateTable
CREATE TABLE `NoticeBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan` ENUM('FOUNDATION', 'TOP', 'PRO') NOT NULL,
    `type` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL,
    `rank` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `points` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
