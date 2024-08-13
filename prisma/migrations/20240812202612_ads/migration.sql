-- AlterTable
ALTER TABLE `Order` MODIFY `description` TEXT NOT NULL DEFAULT '',
    MODIFY `productUrl` TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Ads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageurl` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
