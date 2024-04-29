-- CreateTable
CREATE TABLE `Cashier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cashier_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `nationalityID` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `price` DECIMAL(18, 2) NOT NULL,
    `category` ENUM('UMUM', 'PELAJAR', 'MANCANEGARA') NULL,
    `interval` ENUM('PERMINGGU', 'PERBULAN', 'PERTAHUN') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `total` DECIMAL(18, 2) NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `status` ENUM('SUDAH_DIGUNAKAN', 'DAPAT_DIGUNAKAN', 'EXPIRED', 'MENUNGGU_PEMBAYARAN') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `discount` VARCHAR(191) NULL,
    `cashback` VARCHAR(191) NULL,
    `userID` VARCHAR(191) NULL,
    `cashierID` VARCHAR(191) NULL,
    `nationalityID` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTrans` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `transactionID` VARCHAR(191) NOT NULL,
    `orderID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nationality` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_nationalityID_fkey` FOREIGN KEY (`nationalityID`) REFERENCES `Nationality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_cashierID_fkey` FOREIGN KEY (`cashierID`) REFERENCES `Cashier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_nationalityID_fkey` FOREIGN KEY (`nationalityID`) REFERENCES `Nationality`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTrans` ADD CONSTRAINT `DetailTrans_transactionID_fkey` FOREIGN KEY (`transactionID`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTrans` ADD CONSTRAINT `DetailTrans_orderID_fkey` FOREIGN KEY (`orderID`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
