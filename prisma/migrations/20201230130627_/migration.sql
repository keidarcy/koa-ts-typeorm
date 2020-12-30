/*
  Warnings:

  - The migration will change the primary key for the `Customize` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Customize` DROP PRIMARY KEY,
    ADD COLUMN     `id` INT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterIndex
ALTER TABLE `Customize` RENAME INDEX `Customize_shop_unique` TO `Customize.shop_unique`;
