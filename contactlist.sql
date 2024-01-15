-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2024 at 09:06 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contactlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT '#%&{}>',
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contactnumber` bigint(20) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `image`, `firstname`, `lastname`, `email`, `contactnumber`, `registered`, `updated`) VALUES
(27, 'Jerry.jpg', 'Jerry', 'Mouse', 'jerry@gmail.com', 9987654321, '2024-01-13 06:51:52', '2024-01-14 06:46:56'),
(31, 'Tom.jpg', 'Tom', 'Cat', 'tom@gmail.com', 9147852369, '2024-01-13 07:04:30', '2024-01-14 06:46:30'),
(33, '#%&{}>', 'Lawrence', 'Suico', 'lawrence@gmail.com', 9336345126, '2024-01-13 08:50:37', '2024-01-14 07:03:46'),
(34, '#%&{}>', 'Alexandra', 'Suico', 'alexandra@gmail.com', 9173324920, '2024-01-13 08:50:56', '2024-01-14 07:03:10'),
(39, '#%&{}>', 'Carlson', 'James', 'carlson@gmail.com', 9987654321, '2024-01-15 07:58:13', '2024-01-15 08:04:30'),
(42, 'Spongebob.jpg', 'Spongebob', 'Squarepants', 'spongebob@gmail.com', 9123456789, '2024-01-15 08:02:49', '2024-01-15 08:03:31'),
(43, 'Patrick.jpg', 'Patrick', 'Star', 'patrick@gmail.com', 9987654321, '2024-01-15 08:03:06', '2024-01-15 08:04:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
