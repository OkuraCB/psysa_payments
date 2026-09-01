/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `tokens` DROP FOREIGN KEY `fk_users_tokens`;

-- AlterTable
ALTER TABLE `tokens` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `password`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `payment` DOUBLE NOT NULL DEFAULT 100,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `status` ENUM('EXPIRED', 'SUCCESS', 'FAILED') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_uuid_key` ON `users`(`uuid`);

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `fk_users_tokens` FOREIGN KEY (`user_id`) REFERENCES `users`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`uuid`) ON DELETE NO ACTION ON UPDATE CASCADE;
