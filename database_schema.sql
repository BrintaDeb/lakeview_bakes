-- ============================================================================
-- LAKEVIEW MILK BAR (SINCE 1930) — DATABASE SCHEMA
-- Compatible with: MySQL 5.7+ / 8.0+, MariaDB, Hostinger cPanel phpMyAdmin,
-- PostgreSQL, and cloud relational databases.
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `lakeview_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lakeview_db`;

-- ----------------------------------------------------------------------------
-- Table: users (Patrons)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `phone` VARCHAR(15) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) DEFAULT NULL,
  `member_since` VARCHAR(30) DEFAULT NULL,
  `created_at` BIGINT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: user_addresses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_addresses` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `label` VARCHAR(50) DEFAULT 'Home',
  `address` TEXT NOT NULL,
  `pincode` VARCHAR(10) NOT NULL,
  `is_default` BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: user_vehicles (Midnight Car-Hop Profiles)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_vehicles` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `make_model` VARCHAR(100) NOT NULL,
  `plate_number` VARCHAR(30) NOT NULL,
  `color` VARCHAR(50) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: orders
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `order_number` VARCHAR(64) NOT NULL UNIQUE,
  `created_at` BIGINT NOT NULL,
  `estimated_delivery_time` BIGINT DEFAULT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(120) DEFAULT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(60) DEFAULT 'Bengaluru',
  `postal_code` VARCHAR(10) DEFAULT '560001',
  `subtotal` DECIMAL(10,2) NOT NULL,
  `delivery_fee` DECIMAL(10,2) DEFAULT 0.00,
  `discount` DECIMAL(10,2) DEFAULT 0.00,
  `total` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(80) DEFAULT 'Razorpay',
  `payment_status` ENUM('paid', 'pending', 'failed') DEFAULT 'paid',
  `order_status` ENUM('Order Received', 'Baking in Progress', 'Quality Packed', 'Out for Delivery', 'Delivered') DEFAULT 'Order Received',
  `delivery_date` VARCHAR(30) DEFAULT NULL,
  `delivery_time_slot` VARCHAR(60) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `is_drive_in` BOOLEAN DEFAULT FALSE,
  `vehicle_make_model` VARCHAR(100) DEFAULT NULL,
  `vehicle_plate_number` VARCHAR(30) DEFAULT NULL,
  `pickup_outlet_id` VARCHAR(50) DEFAULT 'mg-road',
  `pickup_outlet_name` VARCHAR(100) DEFAULT 'MG Road Flagship',
  INDEX `idx_orders_phone` (`phone`),
  INDEX `idx_orders_status` (`order_status`),
  INDEX `idx_orders_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: order_items
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `order_id` VARCHAR(64) NOT NULL,
  `product_id` VARCHAR(64) NOT NULL,
  `variant_id` VARCHAR(64) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `image` VARCHAR(255) DEFAULT NULL,
  `size` VARCHAR(50) DEFAULT '1 kg',
  `eggless` BOOLEAN DEFAULT TRUE,
  `message_on_cake` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
