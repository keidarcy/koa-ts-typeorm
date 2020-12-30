-- CreateTable
CREATE TABLE `User` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3),
UNIQUE INDEX `User.shop_unique`(`shop`),
INDEX `User.shop_index`(`shop`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customize` (
    `shop` VARCHAR(191) NOT NULL,
    `newestProducts` BOOLEAN NOT NULL DEFAULT false,
    `recentlyViewedProducts` BOOLEAN NOT NULL DEFAULT false,
    `bestSellingProducts` BOOLEAN NOT NULL DEFAULT false,
    `recommendedProducts` BOOLEAN NOT NULL DEFAULT false,
    `npTitle` VARCHAR(191) DEFAULT 'Newest Products',
    `rvpTitle` VARCHAR(191) DEFAULT 'Recently Viewed Products',
    `bspTitle` VARCHAR(191) DEFAULT 'Best Selling Products',
    `rpTitle` VARCHAR(191) DEFAULT 'Recommended Products',
    `showCart` BOOLEAN NOT NULL DEFAULT true,
    `enableSlideshow` BOOLEAN NOT NULL DEFAULT true,
    `showVariant` BOOLEAN NOT NULL DEFAULT true,
    `showPrice` BOOLEAN NOT NULL DEFAULT true,
    `cropImage` BOOLEAN NOT NULL DEFAULT true,
    `cartText` VARCHAR(191) DEFAULT 'Add to cart',
    `cartColor` VARCHAR(191) NOT NULL DEFAULT '#86b463',
    `titleColor` VARCHAR(191) NOT NULL DEFAULT '#333333',
    `productNameColor` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3),
UNIQUE INDEX `Customize_shop_unique`(`shop`),

    PRIMARY KEY (`shop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customize` ADD FOREIGN KEY (`shop`) REFERENCES `User`(`shop`) ON DELETE CASCADE ON UPDATE CASCADE;
