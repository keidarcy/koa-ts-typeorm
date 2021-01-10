/*
  Warnings:

  - You are about to drop the column `enableSlideshow` on the `Customize` table. All the data in the column will be lost.
  - You are about to drop the column `cropImage` on the `Customize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customize` DROP COLUMN `enableSlideshow`,
    DROP COLUMN `cropImage`;
