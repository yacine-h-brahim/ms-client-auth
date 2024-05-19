-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2024 at 02:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_orderly`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `rate` decimal(2,1) DEFAULT NULL,
  `rate_number` int(11) DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `wilaya` varchar(255) DEFAULT NULL,
  `registersDeCommerce` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `company_email`, `rate`, `rate_number`, `categories`, `address`, `wilaya`, `registersDeCommerce`) VALUES
(9, 'Hanoti', 'hanoti@gmail.com', NULL, NULL, NULL, 'Yacine Ybkbvgggy', '-14-  Tiaret', '[\"https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/rc%2F1715018412857?alt=media&token=28acfa08-886b-4b28-bce9-c58ad7296e19\"]'),
(10, 'Tahnot', 'tahnot@gmail.com', NULL, NULL, NULL, 'Zbzbslsndbxjdbdbxnnxn', '-09-  Blida', '[\"https://firebasestorage.googleapis.com/v0/b/orderly-af56f.appspot.com/o/rc%2F1715021684554?alt=media&token=16beab92-ca26-4d70-a499-e351a9e44aea\"]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
