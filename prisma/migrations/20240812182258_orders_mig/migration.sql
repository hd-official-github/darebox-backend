-- AlterTable
ALTER TABLE `Order` ADD COLUMN `description` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `productUrl` TEXT NOT NULL DEFAULT '';
