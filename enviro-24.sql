-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2024 at 12:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enviro-24`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `category_name`, `category_slug`, `created_at`, `updated_at`) VALUES
(1, 'Real Estate', 'real-estate', NULL, NULL),
(2, 'Interior', 'interior', NULL, NULL),
(3, 'Architecture', 'architecture', NULL, NULL),
(4, 'Home improvement', 'home-improvement', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blogcat_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_title` varchar(255) DEFAULT NULL,
  `post_slug` varchar(255) DEFAULT NULL,
  `post_image` varchar(255) DEFAULT NULL,
  `short_descp` text DEFAULT NULL,
  `long_descp` text DEFAULT NULL,
  `post_tags` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `blogcat_id`, `user_id`, `post_title`, `post_slug`, `post_image`, `short_descp`, `long_descp`, `post_tags`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Est similique earum', 'est-similique-earum', 'upload/post/1761919838112788.jpg', 'Repudiandae officia dsfdsfsd', '<p>Lorem ipsum dolor sit amet consectetur adipisicing sed do eiusmod tempor incididunt labore dolore magna aliqua enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\r\n<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptem accusantium doloremque laudantium.</p>\r\n<blockquote>\r\n<h4>&ldquo;Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.&rdquo;</h4>\r\n</blockquote>\r\n<p>Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed perspiciatis unde omnis iste natus error sit voluptem accusantium doloremque laudantium totam rem aperiam.</p>', 'Realestate,Home,Mazrar', '2023-03-31 19:21:38', NULL),
(3, 1, 1, 'What was it that Prothom Alo did?', 'what-was-it-that-prothom-alo-did?', 'upload/post/1761921390551410.jpg', 'Two separate cases have been', '<div id=\"2b97768c-d80e-4c4a-a956-123932fd86a3\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>Two separate cases have been filed under the Digital Security Act (DSA) against Khulna divisional correspondent of private channel Desh TV following a report on a beauty parlour aired on 18 March, reports UNB.</p>\r\n<p>The news surfaced on Friday when a widespread criticism is going on over the DSA case against Prothom Alo reporter Samsuzzaman.</p>\r\n<p>The two cases were lodged at the court of Khulna Cyber Tribunal Judge Kanika Biswas on 21 and 28 March respectively. The accused journalist is Md Asim.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"storyContent-m__adslot__1CIfJ storyContent-m__adslot-300x250__1-Kzp\">\r\n<div class=\"storyContent-m__advertising__rJT0S\">Advertisement</div>\r\n</div>\r\n</div>\r\n<div id=\"ab4700e3-54a4-4ab8-b8c0-e36f25b65df1\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>According to the first information report (FIR), the journalist prepared a report styled &lsquo;Unethical deeds in guise of beauty parlour&rsquo; and it was aired on the channel on 18 March.</p>\r\n<p>On 21 March, beautician Tania Islam, owner of the beauty parlour, filed the case at the court accusing four people including the journalist.</p>\r\n<p>The other accused are Mahfuzur Rahman, a resident of the Khulna&rsquo;s Khalishpur, Dhaka First News Editor and Publisher Md Sarwar Hossain Khan and its Managing Editor Md Alam Khan.</p>\r\n<p>Taking the case into cognisance, the court ordered the Police Bureau of Investigation to look into the matter.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'Realestate,Digital Security Act,Desh TV', '2023-03-31 19:46:17', NULL),
(4, 3, 1, 'Extremists turn floriculturists', 'extremists-turn-floriculturists', 'upload/post/1761921479601558.png', 'Yunus Ali had joined a secret', '<div id=\"ddec4923-38c1-473d-81c4-bd7f2160d81d\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>Yunus Ali had joined a secret extremist political party and had been on the run for long. He had also been behind the bars for several years. Returning to normal life, Yunus is a complete floriculturist now.&nbsp;</p>\r\n<p>He&rsquo;s living a peaceful life with his family, cultivating flowers. Yunus Ali (66) lives in Ganna village under Ganna union of Jhenaidah Sadar upazila.</p>\r\n<p>Yunus Ali said he did a job for some time after leaving &lsquo;politics&rsquo;. He started flower farming in 2000. He cannot do the farming himself now, but supervises it. He gets it done by labourers.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"storyContent-m__adslot__1CIfJ storyContent-m__adslot-300x250__1-Kzp\">\r\n<div class=\"storyContent-m__advertising__rJT0S\">Advertisement</div>\r\n</div>\r\n</div>\r\n<div id=\"f26387fe-2118-4a08-8e65-327bc7c9fca7\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>He&rsquo;s doing really well and no longer has to remain in hiding. The fragrance of flowers has changed his life.</p>\r\n<p>Oliar Rahman of Ikra village under Ganna union started farming in 1996 leaving extremism behind. Apart from growing flowers, he has been working as a union parishad member since 2011.</p>\r\n<p>He told Prothom Alo, &ldquo;I joined in politics with the hope of bringing a change the society, but nothing of that sort happened. Rather there were clashes.&rdquo;</p>\r\n<p>The condition in their area is a lot better now. Everyone is so hard-working. Flower farming has changed the quality of their lifestyle for better.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'Realestate,Extremist,Flower,Good Day', '2023-03-31 19:47:42', NULL),
(5, 1, 1, 'Desh TV correspondent sued under DSA', 'desh-tv-correspondent-sued-under-dsa', 'upload/post/1761921548656186.jpg', 'Two separate cases have been', '<div id=\"2b97768c-d80e-4c4a-a956-123932fd86a3\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>Two separate cases have been filed under the Digital Security Act (DSA) against Khulna divisional correspondent of private channel Desh TV following a report on a beauty parlour aired on 18 March, reports UNB.</p>\r\n<p>The news surfaced on Friday when a widespread criticism is going on over the DSA case against Prothom Alo reporter Samsuzzaman.</p>\r\n<p>The two cases were lodged at the court of Khulna Cyber Tribunal Judge Kanika Biswas on 21 and 28 March respectively. The accused journalist is Md Asim.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"storyContent-m__adslot__1CIfJ storyContent-m__adslot-300x250__1-Kzp\">\r\n<div class=\"storyContent-m__advertising__rJT0S\">Advertisement</div>\r\n</div>\r\n</div>\r\n<div id=\"ab4700e3-54a4-4ab8-b8c0-e36f25b65df1\">\r\n<div class=\"story-card-m__wrapper__ounrk story-card-m__en-wrapper__1GPcs story-card-m__eng-wrapper__3b6zk\">\r\n<div class=\"  en-story-element\">\r\n<div class=\"story-element story-element-text\">\r\n<div>\r\n<p>According to the first information report (FIR), the journalist prepared a report styled &lsquo;Unethical deeds in guise of beauty parlour&rsquo; and it was aired on the channel on 18 March.</p>\r\n<p>On 21 March, beautician Tania Islam, owner of the beauty parlour, filed the case at the court accusing four people including the journalist.</p>\r\n<p>The other accused are Mahfuzur Rahman, a resident of the Khulna&rsquo;s Khalishpur, Dhaka First News Editor and Publisher Md Sarwar Hossain Khan and its Managing Editor Md Alam Khan.</p>\r\n<p>Taking the case into cognisance, the court ordered the Police Bureau of Investigation to look into the matter.</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'Realestate,news,online,best', '2023-03-31 19:48:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'For Sale', NULL, NULL),
(2, 'For Rent', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `state` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `created_at`, `updated_at`, `state`) VALUES
(1, 'Springfield', '2018-05-17 10:00:20', '2018-05-17 10:00:20', '21'),
(2, 'Agawam', '2018-05-17 10:00:54', '2018-05-17 10:00:54', '21'),
(3, 'East  Longmeadow', '2018-05-17 10:01:19', '2018-05-17 10:01:19', '21'),
(4, 'Longmeadow', '2018-05-17 10:01:34', '2018-05-17 10:01:34', '21'),
(5, 'Chicopee', '2018-05-17 10:01:48', '2018-05-17 10:01:48', '21'),
(6, 'Granby', '2018-05-17 10:01:57', '2018-05-17 10:01:57', '7'),
(7, 'Granby', '2018-05-17 10:02:38', '2018-05-17 10:02:38', '21'),
(8, 'Avon', '2018-05-17 10:02:50', '2018-05-17 10:02:50', '7'),
(9, 'Enfield', '2018-05-17 10:02:57', '2018-05-17 10:02:57', '7'),
(10, 'Sommers', '2018-05-17 10:03:09', '2018-05-17 10:03:09', '7'),
(11, 'Suffield', '2018-05-17 10:03:22', '2018-05-17 10:03:22', '7'),
(12, 'Westfield', '2018-05-17 10:03:38', '2018-05-17 10:03:38', '21'),
(13, 'West Springfield', '2018-05-17 10:03:48', '2018-05-17 10:03:48', '21'),
(14, 'Pittsfield', '2018-05-17 10:04:14', '2018-05-17 10:04:14', '21'),
(15, 'Greenfield', '2018-05-17 10:04:33', '2018-05-17 10:04:33', '21'),
(16, 'Brattleboro', '2018-05-17 10:05:15', '2018-05-17 10:05:15', '45'),
(17, 'East Windsor', '2018-05-17 10:05:36', '2018-05-17 10:05:36', '7'),
(18, 'Manchester', '2018-05-17 10:07:56', '2018-05-17 10:07:56', '7'),
(19, 'Bloomfield', '2018-05-17 10:08:54', '2018-05-17 10:08:54', '7'),
(20, 'Monson', '2018-05-17 10:09:06', '2018-05-17 10:09:06', '21'),
(21, 'Wibraham', '2018-05-17 10:09:18', '2018-05-17 10:09:18', '21'),
(22, 'Warren', '2018-05-17 10:34:35', '2018-05-17 10:34:35', '21'),
(23, 'Holyoke', '2024-04-26 02:05:52', '2024-04-26 02:05:52', '21'),
(24, 'New Haven', '2024-04-26 03:03:02', '2024-04-26 03:03:02', '7'),
(25, 'New Britain', '2024-04-26 03:10:17', '2024-04-26 03:10:17', '7');

-- --------------------------------------------------------

--
-- Table structure for table `extra_photo_fours`
--

CREATE TABLE `extra_photo_fours` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extra_photo_fours`
--

INSERT INTO `extra_photo_fours` (`id`, `file`, `created_at`, `updated_at`) VALUES
(28, '1522460183pexels-photo-280208.jpg', '2018-03-31 10:36:23', '2018-03-31 10:36:23'),
(29, '1522460535pexels-photo-709767.png', '2018-03-31 10:42:15', '2018-03-31 10:42:15'),
(30, '1522460785pexels-photo-265004.jpeg', '2018-03-31 10:46:25', '2018-03-31 10:46:25'),
(31, '1522460941pexels-photo-271624.jpg', '2018-03-31 10:49:01', '2018-03-31 10:49:01'),
(32, '1522461134pexels-photo-276653.jpeg', '2018-03-31 10:52:14', '2018-03-31 10:52:14'),
(33, '1522461277pexels-photo-77931.jpeg', '2018-03-31 10:54:37', '2018-03-31 10:54:37'),
(34, '1522785654pexels-photo-273669.jpeg', '2018-04-04 05:00:54', '2018-04-04 05:00:54'),
(35, '1522788571pexels-photo-276551.jpeg', '2018-04-04 05:49:31', '2018-04-04 05:49:31'),
(36, '1522788677pexels-photo-279719.jpg', '2018-04-04 05:51:17', '2018-04-04 05:51:17'),
(37, '1526257734pexels-photo-271618.jpg', '2018-05-14 09:28:54', '2018-05-14 09:28:54'),
(38, '1526257861pexels-photo-276551.jpeg', '2018-05-14 09:31:01', '2018-05-14 09:31:01'),
(39, '1526257996pexels-photo-273843.jpg', '2018-05-14 09:33:16', '2018-05-14 09:33:16'),
(40, '1526519762pexels-photo-263189.jpeg', '2018-05-17 10:16:02', '2018-05-17 10:16:02'),
(41, '1526519937pexels-photo-271753.jpeg', '2018-05-17 10:18:57', '2018-05-17 10:18:57'),
(42, '1526520079pexels-photo-257344.jpeg', '2018-05-17 10:21:19', '2018-05-17 10:21:19'),
(43, '1526522366pexels-photo-271722.jpg', '2018-05-17 10:59:26', '2018-05-17 10:59:26'),
(44, '1526522488pexels-photo-276508.jpg', '2018-05-17 11:01:28', '2018-05-17 11:01:28'),
(45, '1526522618pexels-photo-276551.jpeg', '2018-05-17 11:03:38', '2018-05-17 11:03:38'),
(46, '1526522809pexels-photo-276700.jpeg', '2018-05-17 11:06:49', '2018-05-17 11:06:49'),
(47, '1526523218pexels-photo-276511.jpg', '2018-05-17 11:13:38', '2018-05-17 11:13:38'),
(48, '1526523393pexels-photo-276724.jpeg', '2018-05-17 11:16:33', '2018-05-17 11:16:33'),
(49, '1526523545pexels-photo-709767.png', '2018-05-17 11:19:05', '2018-05-17 11:19:05'),
(50, '1526523820pexels-photo-279607.jpeg', '2018-05-17 11:23:40', '2018-05-17 11:23:40'),
(51, '1526524107pexels-photo-276715.jpeg', '2018-05-17 11:28:27', '2018-05-17 11:28:27'),
(52, '1526524294pexels-photo-342800.jpg', '2018-05-17 11:31:34', '2018-05-17 11:31:34'),
(53, '1526524449pexels-photo-545046.jpg', '2018-05-17 11:34:09', '2018-05-17 11:34:09'),
(54, '1526524609pexels-photo-279719.jpg', '2018-05-17 11:36:49', '2018-05-17 11:36:49'),
(55, '1526524856pexels-photo-276551.jpeg', '2018-05-17 11:40:56', '2018-05-17 11:40:56'),
(56, '1526525131pexels-photo-279607.jpeg', '2018-05-17 11:45:31', '2018-05-17 11:45:31'),
(57, '1526525357pexels-photo-276554.jpg', '2018-05-17 11:49:17', '2018-05-17 11:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `extra_photo_ones`
--

CREATE TABLE `extra_photo_ones` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extra_photo_ones`
--

INSERT INTO `extra_photo_ones` (`id`, `file`, `created_at`, `updated_at`) VALUES
(42, '1522460183kitchen-stove-sink-kitchen-counter-349749.jpg', '2018-03-31 10:36:23', '2018-03-31 10:36:23'),
(43, '1522460535pexels-photo-275484.jpeg', '2018-03-31 10:42:15', '2018-03-31 10:42:15'),
(44, '1522460785pexels-photo-121668.jpg', '2018-03-31 10:46:25', '2018-03-31 10:46:25'),
(45, '1522460941pexels-photo-106936.jpeg', '2018-03-31 10:49:01', '2018-03-31 10:49:01'),
(46, '1522461134pexels-photo-210265.jpg', '2018-03-31 10:52:14', '2018-03-31 10:52:14'),
(47, '1522461277pexels-photo-210265.jpg', '2018-03-31 10:54:37', '2018-03-31 10:54:37'),
(48, '1522785654pexels-photo-238377.jpeg', '2018-04-04 05:00:54', '2018-04-04 05:00:54'),
(49, '1522788571kitchen-stove-sink-kitchen-counter-349749.jpg', '2018-04-04 05:49:31', '2018-04-04 05:49:31'),
(50, '1522788677pexels-photo-276625.jpg', '2018-04-04 05:51:17', '2018-04-04 05:51:17'),
(51, '1526257734living-room-couch-interior-room-584399.jpeg', '2018-05-14 09:28:54', '2018-05-14 09:28:54'),
(52, '1526257860pexels-photo-271696.jpg', '2018-05-14 09:31:01', '2018-05-14 09:31:01'),
(53, '1526257996pexels-photo-271696.jpg', '2018-05-14 09:33:16', '2018-05-14 09:33:16'),
(54, '1526519762pexels-photo-189333.jpeg', '2018-05-17 10:16:02', '2018-05-17 10:16:02'),
(55, '1526519937kitchen-stove-sink-kitchen-counter-349749.jpg', '2018-05-17 10:18:57', '2018-05-17 10:18:57'),
(56, '1526520079pexels-photo-271696.jpg', '2018-05-17 10:21:19', '2018-05-17 10:21:19'),
(57, '1526522366pexels-photo-271654.jpeg', '2018-05-17 10:59:26', '2018-05-17 10:59:26'),
(58, '1526522488pexels-photo-269218.jpeg', '2018-05-17 11:01:28', '2018-05-17 11:01:28'),
(59, '1526522618pexels-photo-273669.jpeg', '2018-05-17 11:03:38', '2018-05-17 11:03:38'),
(60, '1526522809pexels-photo-276554.jpg', '2018-05-17 11:06:49', '2018-05-17 11:06:49'),
(61, '1526523217pexels-photo-210265.jpg', '2018-05-17 11:13:37', '2018-05-17 11:13:37'),
(62, '1526523393pexels-photo-273669.jpeg', '2018-05-17 11:16:33', '2018-05-17 11:16:33'),
(63, '1526523545pexels-photo-276700.jpeg', '2018-05-17 11:19:05', '2018-05-17 11:19:05'),
(64, '1526523820pexels-photo-271618.jpg', '2018-05-17 11:23:40', '2018-05-17 11:23:40'),
(65, '1526524107kitchen-stove-sink-kitchen-counter-349749.jpg', '2018-05-17 11:28:27', '2018-05-17 11:28:27'),
(66, '1526524294pexels-photo-276715.jpeg', '2018-05-17 11:31:34', '2018-05-17 11:31:34'),
(67, '1526524449pexels-photo-276724.jpeg', '2018-05-17 11:34:09', '2018-05-17 11:34:09'),
(68, '1526524609pexels-photo-262048.jpg', '2018-05-17 11:36:49', '2018-05-17 11:36:49'),
(69, '1526524856pexels-photo-261410.jpeg', '2018-05-17 11:40:56', '2018-05-17 11:40:56'),
(70, '1526525131pexels-photo-271618.jpg', '2018-05-17 11:45:31', '2018-05-17 11:45:31'),
(71, '1526525357pexels-photo-265004.jpeg', '2018-05-17 11:49:17', '2018-05-17 11:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `extra_photo_threes`
--

CREATE TABLE `extra_photo_threes` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extra_photo_threes`
--

INSERT INTO `extra_photo_threes` (`id`, `file`, `created_at`, `updated_at`) VALUES
(26, '1522453916pexels-photo-269218.jpeg', '2018-03-31 08:51:56', '2018-03-31 08:51:56'),
(27, '1522454874pexels-photo-257344.jpeg', '2018-03-31 09:07:54', '2018-03-31 09:07:54'),
(28, '1522460183pexels-photo-545034.jpg', '2018-03-31 10:36:23', '2018-03-31 10:36:23'),
(29, '1522460535pexels-photo-276583.jpeg', '2018-03-31 10:42:15', '2018-03-31 10:42:15'),
(30, '1522460785pexels-photo-238377.jpeg', '2018-03-31 10:46:25', '2018-03-31 10:46:25'),
(31, '1522460941pexels-photo-271632.jpg', '2018-03-31 10:49:01', '2018-03-31 10:49:01'),
(32, '1522461134pexels-photo-273843.jpg', '2018-03-31 10:52:14', '2018-03-31 10:52:14'),
(33, '1522461277pexels-photo-271795.jpeg', '2018-03-31 10:54:37', '2018-03-31 10:54:37'),
(34, '1522785654pexels-photo-271618.jpg', '2018-04-04 05:00:54', '2018-04-04 05:00:54'),
(35, '1522788571pexels-photo-271816.jpeg', '2018-04-04 05:49:31', '2018-04-04 05:49:31'),
(36, '1522788677pexels-photo-280239.jpg', '2018-04-04 05:51:17', '2018-04-04 05:51:17'),
(37, '1526257734pexels-photo-261045.jpg', '2018-05-14 09:28:54', '2018-05-14 09:28:54'),
(38, '1526257861pexels-photo-276677.jpeg', '2018-05-14 09:31:01', '2018-05-14 09:31:01'),
(39, '1526257996pexels-photo-265004.jpeg', '2018-05-14 09:33:16', '2018-05-14 09:33:16'),
(40, '1526519762pexels-photo-271632.jpg', '2018-05-17 10:16:02', '2018-05-17 10:16:02'),
(41, '1526519937pexels-photo-269262.jpg', '2018-05-17 10:18:57', '2018-05-17 10:18:57'),
(42, '1526520079pexels-photo-273822.jpeg', '2018-05-17 10:21:19', '2018-05-17 10:21:19'),
(43, '1526522366pexels-photo-271654.jpeg', '2018-05-17 10:59:26', '2018-05-17 10:59:26'),
(44, '1526522488pexels-photo-276583.jpeg', '2018-05-17 11:01:28', '2018-05-17 11:01:28'),
(45, '1526522618pexels-photo-189333.jpeg', '2018-05-17 11:03:38', '2018-05-17 11:03:38'),
(46, '1526522809pexels-photo-121668.jpg', '2018-05-17 11:06:49', '2018-05-17 11:06:49'),
(47, '1526523217pexels-photo-271816.jpeg', '2018-05-17 11:13:37', '2018-05-17 11:13:37'),
(48, '1526523393pexels-photo-276625.jpg', '2018-05-17 11:16:33', '2018-05-17 11:16:33'),
(49, '1526523545pexels-photo-309724.jpg', '2018-05-17 11:19:05', '2018-05-17 11:19:05'),
(50, '1526523820pexels-photo-238377.jpeg', '2018-05-17 11:23:40', '2018-05-17 11:23:40'),
(51, '1526524107pexels-photo-121668.jpg', '2018-05-17 11:28:27', '2018-05-17 11:28:27'),
(52, '1526524294pexels-photo-271753.jpeg', '2018-05-17 11:31:34', '2018-05-17 11:31:34'),
(53, '1526524449pexels-photo-545034.jpg', '2018-05-17 11:34:09', '2018-05-17 11:34:09'),
(54, '1526524609pexels-photo-269218.jpeg', '2018-05-17 11:36:49', '2018-05-17 11:36:49'),
(55, '1526524856pexels-photo-271632.jpg', '2018-05-17 11:40:56', '2018-05-17 11:40:56'),
(56, '1526525131pexels-photo-271696.jpg', '2018-05-17 11:45:31', '2018-05-17 11:45:31'),
(57, '1526525357pexels-photo-238377.jpeg', '2018-05-17 11:49:17', '2018-05-17 11:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `extra_photo_twos`
--

CREATE TABLE `extra_photo_twos` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `extra_photo_twos`
--

INSERT INTO `extra_photo_twos` (`id`, `file`, `created_at`, `updated_at`) VALUES
(34, '1522460183pexels-photo-276508.jpg', '2018-03-31 10:36:23', '2018-03-31 10:36:23'),
(35, '1522460535pexels-photo-276551.jpeg', '2018-03-31 10:42:15', '2018-03-31 10:42:15'),
(36, '1522460785pexels-photo-261410.jpeg', '2018-03-31 10:46:25', '2018-03-31 10:46:25'),
(37, '1522460941pexels-photo-269218.jpeg', '2018-03-31 10:49:01', '2018-03-31 10:49:01'),
(38, '1522461134living-room-couch-interior-room-584399.jpeg', '2018-03-31 10:52:14', '2018-03-31 10:52:14'),
(39, '1522461277pexels-photo-257344.jpeg', '2018-03-31 10:54:37', '2018-03-31 10:54:37'),
(40, '1522785654pexels-photo-106936.jpeg', '2018-04-04 05:00:54', '2018-04-04 05:00:54'),
(41, '1522788571pexels-photo-271654.jpeg', '2018-04-04 05:49:31', '2018-04-04 05:49:31'),
(42, '1522788677pexels-photo-276653.jpeg', '2018-04-04 05:51:17', '2018-04-04 05:51:17'),
(43, '1526257734pexels-photo-259962.jpg', '2018-05-14 09:28:54', '2018-05-14 09:28:54'),
(44, '1526257861pexels-photo-273669.jpeg', '2018-05-14 09:31:01', '2018-05-14 09:31:01'),
(45, '1526257996pexels-photo-269262.jpg', '2018-05-14 09:33:16', '2018-05-14 09:33:16'),
(46, '1526519762pexels-photo-210552.jpeg', '2018-05-17 10:16:02', '2018-05-17 10:16:02'),
(47, '1526519937pexels-photo-77931.jpeg', '2018-05-17 10:18:57', '2018-05-17 10:18:57'),
(48, '1526520079pexels-photo-261410.jpeg', '2018-05-17 10:21:19', '2018-05-17 10:21:19'),
(49, '1526522366pexels-photo-238377.jpeg', '2018-05-17 10:59:26', '2018-05-17 10:59:26'),
(50, '1526522488pexels-photo-265004.jpeg', '2018-05-17 11:01:28', '2018-05-17 11:01:28'),
(51, '1526522618pexels-photo-265004.jpeg', '2018-05-17 11:03:38', '2018-05-17 11:03:38'),
(52, '1526522809living-room-couch-interior-room-584399.jpeg', '2018-05-17 11:06:49', '2018-05-17 11:06:49'),
(53, '1526523217pexels-photo-273822.jpeg', '2018-05-17 11:13:37', '2018-05-17 11:13:37'),
(54, '1526523393pexels-photo-271618.jpg', '2018-05-17 11:16:33', '2018-05-17 11:16:33'),
(55, '1526523545pexels-photo-238377.jpeg', '2018-05-17 11:19:05', '2018-05-17 11:19:05'),
(56, '1526523820pexels-photo-265004.jpeg', '2018-05-17 11:23:40', '2018-05-17 11:23:40'),
(57, '1526524107pexels-photo-77931.jpeg', '2018-05-17 11:28:27', '2018-05-17 11:28:27'),
(58, '1526524294pexels-photo-271795.jpeg', '2018-05-17 11:31:34', '2018-05-17 11:31:34'),
(59, '1526524449pexels-photo-238377.jpeg', '2018-05-17 11:34:09', '2018-05-17 11:34:09'),
(60, '1526524609pexels-photo-238377.jpeg', '2018-05-17 11:36:49', '2018-05-17 11:36:49'),
(61, '1526524856pexels-photo-261045.jpg', '2018-05-17 11:40:56', '2018-05-17 11:40:56'),
(62, '1526525131pexels-photo-189333.jpeg', '2018-05-17 11:45:31', '2018-05-17 11:45:31'),
(63, '1526525357pexels-photo-210552.jpeg', '2018-05-17 11:49:17', '2018-05-17 11:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `property_id` int(11) NOT NULL,
  `facility_name` varchar(255) DEFAULT NULL,
  `distance` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `street` varchar(255) NOT NULL,
  `city_id` bigint(20) UNSIGNED DEFAULT NULL,
  `state_id` int(11) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `beds` int(10) UNSIGNED NOT NULL,
  `baths` int(10) UNSIGNED NOT NULL,
  `sqft` int(10) UNSIGNED NOT NULL,
  `fullpic_id` int(11) DEFAULT NULL,
  `extrapicone_id` int(11) DEFAULT NULL,
  `extrapictwo_id` int(11) DEFAULT NULL,
  `extrapicthree_id` int(11) DEFAULT NULL,
  `extrapicfour_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `descrip` text NOT NULL,
  `feat_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `extraphotos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`extraphotos`)),
  `main_photo` varchar(255) DEFAULT NULL,
  `city_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `category_id`, `street`, `city_id`, `state_id`, `price`, `beds`, `baths`, `sqft`, `fullpic_id`, `extrapicone_id`, `extrapictwo_id`, `extrapicthree_id`, `extrapicfour_id`, `user_id`, `descrip`, `feat_id`, `created_at`, `updated_at`, `extraphotos`, `main_photo`, `city_name`) VALUES
(1, 1, '24 Moonlight Drive', 1, 21, 300000, 5, 1, 3000, 77, 54, 46, 40, 40, 9, 'Elegant custom home offers unparalleled craftsmanship and exceptional \r\namenities! This French-inspired design is truly remarkable inside and out. \r\nFeatures include cherry cabinets, quartz countertops, crown molding, custom \r\nwindows provide plenty of natural lighting, expansive decking (1000 sq. ft.), \r\ngourmet kitchen with island (great for entertaining), gorgeous master suite, \r\nden, storage, plus STUNNING views ', 0, '2018-05-17 10:16:02', '2018-05-17 10:16:02', NULL, NULL, ''),
(2, 1, '59 Blue Moon Road', 2, 21, 350000, 6, 2, 4000, 78, 55, 47, 41, 41, 10, 'Masterful design and modern luxury are uniquely embodied in this 4 \r\nbedroom 4.5 bath Duplex Penthouse with a 4500 SF wraparound terrace \r\natop Sky Lofts Condominium. This one-of-a-kind glass house, created by New \r\nYork architect James Carpenter who designed 7 World Trade Center, is \r\nsheathed in high-performance, museum-quality insulated glass atop an \r\nhistoric Art Deco loft building in the heart of Tribeca. The sun and \r\ntemperature-controlled glass envelope of its 7500 SF interior was tastefully \r\ndesigned with the top art collector in mind. Unobstructed 360 views from \r\nthis penthouse are truly unparalleled, and include vistas of the Freedom \r\nTower, Empire State Building and Hudson River.', 0, '2018-05-17 10:18:57', '2018-05-17 10:18:57', NULL, NULL, ''),
(3, 1, '1969 Sunnyvale Road', 4, 21, 450000, 7, 3, 4000, 79, 56, 48, 42, 42, 11, 'Living is easy in this impressive, generously spacious residence with Delta \r\nviews and access.\r\n\r\nThe open floor plan encompasses four spacious bedrooms with plenty of \r\nroom for study, sleep and storage, four and a half luxurious bathrooms, and a \r\nsleek and stylish gourmet kitchen that flows through to the dining room.  The \r\nexpansive living room opens up to a spacious rear patio with pool and spa and \r\nprivate boat dock on San Joaquin Delta. The master bedroom, complete with \r\nwalk-in closet and ensuite, ensures parents have a private space where they \r\ncan enjoy the Delta views on their private balcony.\r\n\r\nPerfect for anyone, this home is ideally positioned to enjoy summers on the \r\nDelta.  Truly resort style living in Brookside Country Club Estates.', 0, '2018-05-17 10:21:19', '2018-05-17 10:21:19', NULL, NULL, ''),
(4, 1, '73 Darkville Ave', 5, 21, 140000, 4, 1, 2000, 80, 57, 49, 43, 43, 12, 'This immaculate, professionally-designed 2-story condo with a private deck \r\nand patio invites comfort, and exudes modern elegance. With 2 bedrooms, 2 \r\nand a half baths, generous living space and stylish finishes, you\'ll enjoy a \r\nperfect setting for relaxing and entertaining.\r\n\r\nBeautiful mahogany hardwood floors and plenty of natural night flow \r\nthroughout the home\'s open, airy layout. Other special highlights include a \r\ncharming gas fireplace, rich exposed brick, chic recessed lighting and ceiling \r\nfans, a Kenmore Elite washer/dryer, marble baths, tons of storage space, and \r\nready-for-cable wiring in all rooms.', 0, '2018-05-17 10:59:26', '2018-05-17 10:59:26', NULL, NULL, ''),
(5, 1, '488 Mountain Way', 6, 7, 103000, 4, 1, 3000, 81, 58, 50, 44, 44, 11, 'This immaculate, professionally-designed 2-story condo with a private deck \r\nand patio invites comfort, and exudes modern elegance. With 2 bedrooms, 2 \r\nand a half baths, generous living space and stylish finishes, you\'ll enjoy a \r\nperfect setting for relaxing and entertaining.\r\n\r\nBeautiful mahogany hardwood floors and plenty of natural night flow \r\nthroughout the home\'s open, airy layout. Other special highlights include a \r\ncharming gas fireplace, rich exposed brick, chic recessed lighting and ceiling \r\nfans, a Kenmore Elite washer/dryer, marble baths, tons of storage space, and \r\nready-for-cable wiring in all rooms.', 0, '2018-05-17 11:01:28', '2018-05-17 11:01:28', NULL, NULL, ''),
(6, 1, '669 Blue Ocean Drive', 10, 7, 400000, 8, 3, 4000, 82, 59, 51, 45, 45, 10, 'Living is easy in this impressive, generously spacious residence with Delta \r\nviews and access.\r\n\r\nThe open floor plan encompasses four spacious bedrooms with plenty of \r\nroom for study, sleep and storage, four and a half luxurious bathrooms, and a \r\nsleek and stylish gourmet kitchen that flows through to the dining room.  The \r\nexpansive living room opens up to a spacious rear patio with pool and spa and \r\nprivate boat dock on San Joaquin Delta. The master bedroom, complete with \r\nwalk-in closet and ensuite, ensures parents have a private space where they \r\ncan enjoy the Delta views on their private balcony.', 0, '2018-05-17 11:03:38', '2018-05-17 11:03:38', NULL, NULL, ''),
(7, 1, '56 Morning Breeze Street', 17, 7, 300000, 5, 2, 3000, 83, 60, 52, 46, 46, 10, 'Paradise at The Point! This luxurious 5 bedroom 4.5 bath Dienst-built estate on \r\nthe Lake Norman peninsula is a dream home in a high-end community that\'s \r\nhome to Trump National Golf Club. Spanning over 4900 SF, this magnificent \r\nwaterfront residence graced by soaring ceilings and wall-to-wall windows is a \r\nhaven for gazing at Lake Norman views from multiple vantage points. The grand \r\nentryway with a sweeping staircase draws you into a voluminous layout made \r\nfor entertaining. ', 0, '2018-05-17 11:06:49', '2018-05-17 11:06:49', NULL, NULL, ''),
(8, 1, '34 Greensville Road', 16, 45, 230000, 4, 1, 3000, 84, 61, 53, 47, 47, 9, 'It won’t be easy to click out of holiday mode in this stylishly contemporary \r\nresidence for the modern pleasure-seeker.\r\n\r\nCool, calm and sophisticated with a youthful edge, this functional home is \r\nenveloped in light and comfort. Crisp white walls, timber floors and high \r\nceilings create a style as timeless as the sparkling ocean view. The calming sea \r\nvista, captured through the extensive use of glass, will help you forget your \r\ncity stress.\r\n\r\nThis house screams ‘designer’ and will reflect the personality and taste of \r\nthose accustomed to the best in quality design, finishes and lifestyle', 0, '2018-05-17 11:13:38', '2018-05-17 11:13:38', NULL, NULL, ''),
(9, 1, '718 White Clouds Ave', 17, 7, 300000, 5, 2, 3000, 85, 62, 54, 48, 48, 13, 'This immaculately presented apartment is set amongst manicured grounds \r\nwithin a private and secure complex. As a resident you will have access to \r\nlifestyle amenities including a lap pool, gymnasium, communal terraces, \r\nconcierge service and basement parking.\r\n\r\nThe floorplan incorporates 2 bedrooms, the main with built-in robe and \r\nensuite, a study nook, modern kitchen with quality appliances, luxurious \r\nbathroom, a cleverly concealed laundry and a spacious living/dining area. The \r\ngenerously proportioned interior flows effortlessly from the open-plan living \r\nspace to the private covered balcony from which you can admire the views of \r\nthe garden and beyond.\r\n\r\nWith its warm sense of community, and only moments to shops, eateries and \r\ntransport this home provides all the elements for relaxing, comfortable and \r\neasycare living.', 0, '2018-05-17 11:16:33', '2018-05-17 11:16:33', NULL, NULL, ''),
(10, 1, '45 Forest Drive', 2, 21, 163000, 3, 1, 2000, 86, 63, 55, 49, 49, 7, 'This cozy cottage is nestled against a spectacular coastal backdrop with an \r\nunbroken view of the sea and a faraway coastline. With an environmentally \r\nconscious design that maximizes home efficiency, this spectacular, modern \r\nfamily home provides plenty of space for entertaining. This truly is a dream \r\nabode for the growing family.', 0, '2018-05-17 11:19:05', '2018-05-17 11:19:05', NULL, NULL, ''),
(11, 1, '889 Woodsy Street', 1, 21, 180000, 3, 1, 2500, 88, 64, 56, 50, 50, 4, 'Embrace the spirit of DIY with this original cottage occupying a peaceful street \r\nposition. This charming weatherboard home features 3 roomy bedrooms and \r\nbright, open living spaces.\r\n\r\nThere’s plenty of potential for the savvy investor or first home buyer.', 0, '2018-05-17 11:23:40', '2018-05-17 11:24:28', NULL, NULL, ''),
(12, 1, '1645 Peachville Drive', 2, 21, 240500, 5, 1, 2300, 89, 65, 57, 51, 51, 6, 'The living is easy in this impressive, generously proportioned contemporary \r\nresidence with lake and ocean views, located within a level stroll to the sand \r\nand surf.\r\n\r\nThe floor plan encompasses four spacious bedrooms with plenty of room for \r\nstudy, sleep and storage, three luxurious bathrooms, and a sleek and stylish \r\nkitchen that flows through to the dining room and private rear patio. The \r\nmaster bedroom, complete with walk-in robe and ensuite, ensures parents \r\nhave a private space where they can enjoy the view.\r\n\r\nPerfect for a family or as a holiday retreat, this home is ideally positioned to \r\nenjoy the proximity to beaches, cafes and restaurants, shopping centre, and a \r\nselection of premier schools.', 0, '2018-05-17 11:28:27', '2018-05-17 11:28:27', NULL, NULL, ''),
(13, 1, '90 Granite Ave', 3, 21, 250000, 5, 1, 3000, 90, 66, 58, 52, 52, 12, 'The living is easy in this impressive, generously proportioned contemporary \r\nresidence with lake and ocean views, located within a level stroll to the sand \r\nand surf.\r\n\r\nThe floor plan encompasses four spacious bedrooms with plenty of room for \r\nstudy, sleep and storage, three luxurious bathrooms, and a sleek and stylish \r\nkitchen that flows through to the dining room and private rear patio. The \r\nmaster bedroom, complete with walk-in robe and ensuite, ensures parents \r\nhave a private space where they can enjoy the view.\r\n\r\nPerfect for a family or as a holiday retreat, this home is ideally positioned to \r\nenjoy the proximity to beaches, cafes and restaurants, shopping centre, and a \r\nselection of premier schools.', 0, '2018-05-17 11:31:34', '2018-05-17 11:31:34', NULL, NULL, ''),
(14, 1, '1968 Rocky Hill Road', 9, 7, 180000, 4, 1, 2000, 91, 67, 59, 53, 53, 9, 'The living is easy in this impressive, generously proportioned contemporary \r\nresidence with lake and ocean views, located within a level stroll to the sand \r\nand surf.\r\n\r\nThe floor plan encompasses four spacious bedrooms with plenty of room for \r\nstudy, sleep and storage, three luxurious bathrooms, and a sleek and stylish \r\nkitchen that flows through to the dining room and private rear patio. The \r\nmaster bedroom, complete with walk-in robe and ensuite, ensures parents \r\nhave a private space where they can enjoy the view.\r\n\r\nPerfect for a family or as a holiday retreat, this home is ideally positioned to \r\nenjoy the proximity to beaches, cafes and restaurants, shopping centre, and a \r\nselection of premier schools.', 0, '2018-05-17 11:34:09', '2018-05-17 11:34:09', NULL, NULL, ''),
(15, 1, '1969 Breezy Way', 12, 21, 330000, 5, 2, 4500, 92, 68, 60, 54, 54, 13, 'The living is easy in this impressive, generously proportioned contemporary \r\nresidence with lake and ocean views, located within a level stroll to the sand \r\nand surf.\r\n\r\nThe floor plan encompasses four spacious bedrooms with plenty of room for \r\nstudy, sleep and storage, three luxurious bathrooms, and a sleek and stylish \r\nkitchen that flows through to the dining room and private rear patio. The \r\nmaster bedroom, complete with walk-in robe and ensuite, ensures parents \r\nhave a private space where they can enjoy the view.\r\n\r\nPerfect for a family or as a holiday retreat, this home is ideally positioned to \r\nenjoy the proximity to beaches, cafes and restaurants, shopping centre, and a \r\nselection of premier schools.', 0, '2018-05-17 11:36:49', '2018-05-17 11:36:49', NULL, NULL, ''),
(16, 1, '68 Winter Drive', 18, 7, 465000, 7, 3, 4500, 93, 69, 61, 55, 55, 10, 'This immaculately presented apartment is set amongst manicured grounds \r\nwithin a private and secure complex. As a resident you will have access to \r\nlifestyle amenities including a lap pool, gymnasium, communal terraces, \r\nconcierge service and basement parking.\r\n\r\nThe floorplan incorporates 2 bedrooms, the main with built-in robe and \r\nensuite, a study nook, modern kitchen with quality appliances, luxurious \r\nbathroom, a cleverly concealed laundry and a spacious living/dining area. The \r\ngenerously proportioned interior flows effortlessly from the open-plan living \r\nspace to the private covered balcony from which you can admire the views of \r\nthe garden and beyond.\r\n\r\nWith its warm sense of community, and only moments to shops, eateries and \r\ntransport this home provides all the elements for relaxing, comfortable and \r\neasycare living', 0, '2018-05-17 11:40:56', '2018-05-17 11:40:56', NULL, NULL, ''),
(17, 1, '1071 Floral Street', 2, 21, 270600, 5, 1, 3200, 94, 70, 62, 56, 56, 6, 'This cozy cottage is nestled against a spectacular coastal backdrop with an \r\nunbroken view of the sea and a faraway coastline. With an environmentally \r\nconscious design that maximizes home efficiency, this spectacular, modern \r\nfamily home provides plenty of space for entertaining. This truly is a dream \r\nabode for the growing family.', 0, '2018-05-17 11:45:31', '2018-05-17 11:45:31', NULL, NULL, ''),
(18, 1, '545 Lightning Circle', 7, 21, 251000, 4, 1, 3000, 95, 71, 63, 57, 57, 12, 'Embrace the spirit of DIY with this original cottage occupying a peaceful street \r\nposition. This charming weatherboard home features 3 roomy bedrooms and \r\nbright, open living spaces.\r\n\r\nThere’s plenty of potential for the savvy investor or first home buyer.', 0, '2018-05-17 11:49:17', '2018-05-17 11:49:17', NULL, NULL, ''),
(21, 1, '71 Redfrens Road', 14, 21, 400000, 6, 3, 250, 94, NULL, NULL, NULL, NULL, 3, 'Elegant custom home offers unparalleled craftsmanship and exceptional \namenities! This French-inspired design is truly remarkable inside and out. \nFeatures include cherry cabinets, quartz countertops, crown molding, custom \nwindows provide plenty of natural lighting, expansive decking (1000 sq. ft.), \ngourmet kitchen with island (great for entertaining), gorgeous master suite, \nden, storage, plus STUNNING views', 1, '2024-04-25 02:54:27', '2024-04-25 02:54:27', NULL, 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627622/Envirogreen/pexels-pixabay-277667.jpg', ''),
(22, 1, '69 Blueridge Road', NULL, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, 'Elegant custom home offers unparalleled craftsmanship and exceptional \namenities! This French-inspired design is truly remarkable inside and out. \nFeatures include cherry cabinets, quartz countertops, crown molding, custom \nwindows provide plenty of natural lighting, expansive decking (1000 sq. ft.), \ngourmet kitchen with island (great for entertaining), gorgeous master suite, \nden, storage, plus STUNNING views', NULL, '2024-04-26 02:27:54', '2024-04-26 02:27:54', NULL, 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916455/Envirogreen/jinjoe_a_large_home_in_a_quiet_neighborhood_in_the_style_of_u_63eda1cd-a1a8-4f2d-837a-6398244bab67_1.png', 'Holyoke'),
(24, 1, '69 Blueridge Road', 23, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, 'Elegant custom home offers unparalleled craftsmanship and exceptional \namenities! This French-inspired design is truly remarkable inside and out. \nFeatures include cherry cabinets, quartz countertops, crown molding, custom \nwindows provide plenty of natural lighting, expansive decking (1000 sq. ft.), \ngourmet kitchen with island (great for entertaining), gorgeous master suite, \nden, storage, plus STUNNING views', NULL, '2024-04-26 02:33:23', '2024-04-26 02:33:23', NULL, 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627622/Envirogreen/pexels-pixabay-209315.jpg', 'Holyoke'),
(25, 1, '73 Moonglow Road', 2, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 02:36:58', '2024-04-26 02:36:58', NULL, 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627629/Envirogreen/pexels-heyho-7031593.jpg', 'Agawam'),
(26, 1, '75 Moonglow Road', 2, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 02:38:37', '2024-04-26 02:38:37', NULL, 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627615/Envirogreen/pexels-pixabay-209274.jpg', 'Agawam'),
(27, 1, '75 Moonglow Road', 2, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 02:53:51', '2024-04-26 02:53:51', '\"[\\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916451\\/Envirogreen\\/blackbirdai_85975_interior_of_a_modern_european_flat_bedroom_ph_5ca63423-4947-416e-8089-369cc3b4e565.png\\\", \\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916444\\/Envirogreen\\/jadedea_An_8k_uhd_resolution_photo_realistic_living_room_with_a_90c4ba5d-2e2a-4715-929a-e424ea83b002.png\\\"]\"', 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627603/Envirogreen/pexels-curtis-adams-1694007-3935333.jpg', 'Agawam'),
(28, 1, '88 Greeway Road', 23, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 12, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 02:55:22', '2024-04-26 02:55:22', '\"[\\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916451\\/Envirogreen\\/blackbirdai_85975_interior_of_a_modern_european_flat_bedroom_ph_5ca63423-4947-416e-8089-369cc3b4e565.png\\\", \\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916444\\/Envirogreen\\/jadedea_An_8k_uhd_resolution_photo_realistic_living_room_with_a_90c4ba5d-2e2a-4715-929a-e424ea83b002.png\\\"]\"', 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916445/Envirogreen/aaravsawlani_suburban_home_with_beautiful_front_lawn_on_a_sunny_7447f54a-9488-49d1-b613-aecdec5fb95f.png', 'Holyoke'),
(29, 1, '89 Greeway Road', 23, 21, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 03:00:14', '2024-04-26 03:00:14', '\"[\\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916451\\/Envirogreen\\/blackbirdai_85975_interior_of_a_modern_european_flat_bedroom_ph_5ca63423-4947-416e-8089-369cc3b4e565.png\\\", \\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916444\\/Envirogreen\\/jadedea_An_8k_uhd_resolution_photo_realistic_living_room_with_a_90c4ba5d-2e2a-4715-929a-e424ea83b002.png\\\"]\"', 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1717627593/Envirogreen/pexels-scottwebb-1029599.jpg', 'Holyoke'),
(30, 1, '7 Blue Ave', 25, 7, 250000, 4, 2, 250, NULL, NULL, NULL, NULL, NULL, 13, '<p>Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French-inspired design is truly remarkable inside and out.Features include cherry cabinets, quartz countertops, crown molding, custom windows provide plenty of natural lighting, expansive decking (1000 sq. ft.), gourmet kitchen with island (great for entertaining), gorgeous master suite, den, storage, plus STUNNING views </p>', NULL, '2024-04-26 03:03:02', '2024-04-26 03:10:57', '\"[\\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916451\\/Envirogreen\\/blackbirdai_85975_interior_of_a_modern_european_flat_bedroom_ph_5ca63423-4947-416e-8089-369cc3b4e565.png\\\", \\\"https:\\/\\/res.cloudinary.com\\/dwgjvssdt\\/image\\/upload\\/v1713916444\\/Envirogreen\\/jadedea_An_8k_uhd_resolution_photo_realistic_living_room_with_a_90c4ba5d-2e2a-4715-929a-e424ea83b002.png\\\"]\"', 'https://res.cloudinary.com/dwgjvssdt/image/upload/v1713916457/Envirogreen/jinjoe_a_large_home_in_a_quiet_neighborhood_in_the_style_of_u_32a877fa-4a28-4d1a-891a-59e6c84f00dc_1.png', 'New Britain');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2017_12_30_015856_create_posts_table', 1),
(5, '2018_01_03_013953_create_categories_table', 1),
(6, '2018_02_18_193437_create_roles_table', 1),
(7, '2018_03_06_034118_create_photoStaff_table', 1),
(8, '2018_03_06_034156_create_photoListing_table', 1),
(9, '2018_03_06_035435_create_positions_table', 1),
(10, '2018_03_06_035531_create_listings_table', 1),
(11, '2018_03_13_235355_create_states_table', 1),
(12, '2018_05_15_222344_create_cities_table', 1),
(13, '2024_04_20_173940_create_personal_access_tokens_table', 1),
(14, '2024_04_20_180652_add_additional_fields_to_users_table', 1),
(15, '2018_03_12_234943_create_extra_photo_ones_table', 2),
(16, '2018_03_12_235001_create_extra_photo_twos_table', 2),
(17, '2018_03_12_235010_create_extra_photo_threes_table', 2),
(18, '2018_03_12_235021_create_extra_photo_fours_table', 2),
(19, '2018_01_18_195525_add_slug_column', 3),
(20, '2018_05_15_225033_add_state_column_to_cities_table', 4),
(21, '2024_04_20_193112_add_additional_fields_to_states_table', 5),
(22, '2024_04_24_225127_make_fields_nullable_in_listings_table', 6),
(23, '2024_04_24_230839_add_extraphotos_to_listings_table', 7),
(24, '2024_04_24_234250_make_fullpic_id_nullable_in_listings_table', 8),
(25, '2024_04_24_235144_add_main_photo_to_listings_table', 9),
(26, '2024_04_25_000155_make_city_id_nullable_in_listings_table', 10),
(27, '2024_04_25_222721_make_feat_id_nullable_in_listings_table', 11),
(28, '2023_03_08_190335_create_facilities_table', 12),
(29, '2023_03_20_182407_create_wishlists_table', 12),
(30, '2023_03_31_184038_create_blog_categories_table', 12),
(31, '2023_03_31_201542_create_blog_posts_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(5, 'App\\Models\\User', 3, 'myapptoken', '6868ad34858ab1900d6255e953655bcbb648d710bb35b586a58327585f952ebd', '[\"*\"]', '2024-05-03 02:50:33', NULL, '2024-04-28 02:13:05', '2024-05-03 02:50:33'),
(6, 'App\\Models\\User', 3, 'myapptoken', 'f94ea283e5f97131e9687641fcb0bf392fc811829664d7d3376f2308378bfe20', '[\"*\"]', NULL, NULL, '2024-05-05 01:35:21', '2024-05-05 01:35:21');

-- --------------------------------------------------------

--
-- Table structure for table `photoslisting`
--

CREATE TABLE `photoslisting` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photoslisting`
--

INSERT INTO `photoslisting` (`id`, `file`, `created_at`, `updated_at`) VALUES
(65, '1522460183pexels-photo-164516.jpg', '2018-03-31 10:36:23', '2018-03-31 10:36:23'),
(66, '1522460535pexels-photo-210617.jpg', '2018-03-31 10:42:15', '2018-03-31 10:42:15'),
(67, '1522460785pexels-photo-140511.jpeg', '2018-03-31 10:46:25', '2018-03-31 10:46:25'),
(68, '1522460941pexels-photo-210617.jpg', '2018-03-31 10:49:01', '2018-03-31 10:49:01'),
(69, '1522461134pexels-photo-534184.jpg', '2018-03-31 10:52:14', '2018-03-31 10:52:14'),
(70, '1522461277pexels-photo-139115.jpeg', '2018-03-31 10:54:37', '2018-03-31 10:54:37'),
(71, '1522785654pexels-photo-259098.jpg', '2018-04-04 05:00:54', '2018-04-04 05:00:54'),
(72, '1522788571pexels-photo-139115.jpeg', '2018-04-04 05:49:31', '2018-04-04 05:49:31'),
(73, '1522788677pexels-photo-209296.jpg', '2018-04-04 05:51:17', '2018-04-04 05:51:17'),
(74, '1526257734pexels-photo-206172.jpeg', '2018-05-14 09:28:54', '2018-05-14 09:28:54'),
(75, '1526257860pexels-photo-259646.jpg', '2018-05-14 09:31:00', '2018-05-14 09:31:00'),
(76, '1526257996pexels-photo-221024_1.jpg', '2018-05-14 09:33:16', '2018-05-14 09:33:16'),
(77, '1526519761pexels-photo-164539.jpeg', '2018-05-17 10:16:02', '2018-05-17 10:16:02'),
(78, '1526519937pexels-photo-164558.jpg', '2018-05-17 10:18:57', '2018-05-17 10:18:57'),
(79, '1526520079pexels-photo-259751.jpeg', '2018-05-17 10:21:19', '2018-05-17 10:21:19'),
(80, '1526522366pexels-photo-534184.jpg', '2018-05-17 10:59:26', '2018-05-17 10:59:26'),
(81, '1526522488pexels-photo-221024.jpg', '2018-05-17 11:01:28', '2018-05-17 11:01:28'),
(82, '1526522618large-home-residential-house-architecture-53610.jpeg', '2018-05-17 11:03:38', '2018-05-17 11:03:38'),
(83, '1526522809pexels-photo-280229.jpeg', '2018-05-17 11:06:49', '2018-05-17 11:06:49'),
(84, '1526523217pexels-photo-243722.jpg', '2018-05-17 11:13:37', '2018-05-17 11:13:37'),
(85, '1526523393pexels-photo-140511.jpeg', '2018-05-17 11:16:33', '2018-05-17 11:16:33'),
(86, '1526523545pexels-photo-139115.jpeg', '2018-05-17 11:19:05', '2018-05-17 11:19:05'),
(87, '1526523820pexels-photo-139115.jpeg', '2018-05-17 11:23:40', '2018-05-17 11:23:40'),
(88, '1526523868pexels-photo-164522.jpg', '2018-05-17 11:24:28', '2018-05-17 11:24:28'),
(89, '1526524107pexels-photo-164516.jpg', '2018-05-17 11:28:27', '2018-05-17 11:28:27'),
(90, '1526524294pexels-photo-206172.jpeg', '2018-05-17 11:31:34', '2018-05-17 11:31:34'),
(91, '1526524449pexels-photo-534184.jpg', '2018-05-17 11:34:09', '2018-05-17 11:34:09'),
(92, '1526524609pexels-photo-106399.jpg', '2018-05-17 11:36:49', '2018-05-17 11:36:49'),
(93, '1526524856pexels-photo-462358.jpg', '2018-05-17 11:40:56', '2018-05-17 11:40:56'),
(94, '1526525131pexels-photo-206673.jpeg', '2018-05-17 11:45:31', '2018-05-17 11:45:31'),
(95, '1526525357pexels-photo-139115.jpeg', '2018-05-17 11:49:17', '2018-05-17 11:49:17');

-- --------------------------------------------------------

--
-- Table structure for table `photosstaff`
--

CREATE TABLE `photosstaff` (
  `id` int(10) UNSIGNED NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photosstaff`
--

INSERT INTO `photosstaff` (`id`, `file`, `created_at`, `updated_at`) VALUES
(1, 'sam.jpg', NULL, NULL),
(2, 'luger.jpg', NULL, NULL),
(9, '1522274393r32fdewq2fdc3eq.jpg', '2018-03-29 06:59:53', '2018-03-29 06:59:53'),
(10, '1522274409454564fw.jpg', '2018-03-29 07:00:09', '2018-03-29 07:00:09'),
(11, '1522457745fdgsdfg.jpg', '2018-03-31 09:55:45', '2018-03-31 09:55:45'),
(12, '152245777232133.jpg', '2018-03-31 09:56:12', '2018-03-31 09:56:12'),
(13, '15224578421522274393r32fdewq2fdc3eq.jpg', '2018-03-31 09:57:22', '2018-03-31 09:57:22'),
(14, '1522457925247885.jpg', '2018-03-31 09:58:45', '2018-03-31 09:58:45'),
(15, '1522457969247885.jpg', '2018-03-31 09:59:29', '2018-03-31 09:59:29'),
(16, '152245804723r2dqd32wq.jpg', '2018-03-31 10:00:47', '2018-03-31 10:00:47'),
(17, '1522458129fwersf.jpg', '2018-03-31 10:02:09', '2018-03-31 10:02:09'),
(18, '152245830243tf3t3e4wr.jpg', '2018-03-31 10:05:02', '2018-03-31 10:05:02'),
(19, '15224583841515033345233254.jpg', '2018-03-31 10:06:24', '2018-03-31 10:06:24'),
(20, '152245845746465456446.jpg', '2018-03-31 10:07:37', '2018-03-31 10:07:37');

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Founder', NULL, NULL),
(2, 'Sales Agent', NULL, NULL),
(3, 'Reality Agent', NULL, NULL),
(4, 'Web Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `photo_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', NULL, NULL),
(2, 'SuperAdmin', NULL, NULL),
(3, 'User', NULL, NULL),
(4, 'Sales', NULL, NULL),
(5, 'Agent', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5mTQWm8vmr90Cwr0OCISAT5OC5bAQCfSJBY2Q12K', NULL, '127.0.0.1', 'PostmanRuntime/7.36.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGhOR0NmREsxWTRPR3dGZU1wNmlGSGxXczVGaWU0SzI2eVVKWGNETiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6NzAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713916083),
('AfRzRAG4sQ45L0z4fYXHkl6TvQ5Mpv4k3kBVHiBq', NULL, '127.0.0.1', 'PostmanRuntime/7.36.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSllUR0NidkJiTVNSbTkxQnRvMnB1d3hRWWgxUWo4Y1lveTlNWTlodCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6NzAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1714084847),
('gPQHZRzzoZ4xk6bn7iXrrDYKPPDr2JPSFWULuRNZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGlBOGRHeFhJT1BhVXJvWGt3VUoxelhZNlpGWDZEZWdTc2R2VzUzbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6NzAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1717110377),
('w1eCN2UqHd2961j0RY7b6zuOEpC2vHN6gmlrQ3NE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZHNiTnltOHczejNjb1dJSHh0MjhQdVZ1NmprNmlGQUdFaThxaVRnbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6NzAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1713741534);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbrev` varchar(3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`, `abbrev`, `created_at`, `updated_at`) VALUES
(1, 'Alabama', 'AL', '2018-05-17 07:19:06', '2018-05-17 07:19:06'),
(2, 'Alaska', 'AK', '2018-05-17 07:20:12', '2018-05-17 07:20:12'),
(3, 'Arizona ', 'AZ', '2018-05-17 07:21:05', '2018-05-17 07:21:05'),
(4, 'Arkansas ', 'AR', '2018-05-17 07:21:19', '2018-05-17 07:21:19'),
(5, 'California ', 'CA', '2018-05-17 07:21:28', '2018-05-17 07:21:28'),
(6, 'Colorado ', 'CO', '2018-05-17 07:21:40', '2018-05-17 07:21:40'),
(7, 'Connecticut ', 'CT', '2018-05-17 07:21:50', '2018-05-17 07:21:50'),
(8, 'Delaware ', 'DE', '2018-05-17 07:22:01', '2018-05-17 07:22:01'),
(9, 'Florida ', 'FL', '2018-05-17 07:22:09', '2018-05-17 07:22:09'),
(10, 'Georgia ', 'GA', '2018-05-17 07:22:40', '2018-05-17 07:22:40'),
(11, 'Hawaii ', 'HI', '2018-05-17 07:22:51', '2018-05-17 07:22:51'),
(12, 'Idaho ', 'ID', '2018-05-17 07:23:01', '2018-05-17 07:23:01'),
(13, 'Illinois ', 'IL', '2018-05-17 07:23:13', '2018-05-17 07:23:13'),
(14, 'Indiana ', 'IN', '2018-05-17 07:23:25', '2018-05-17 07:23:25'),
(15, 'Iowa ', 'IA', '2018-05-17 07:23:36', '2018-05-17 07:23:36'),
(16, 'Kansas ', 'KS', '2018-05-17 07:23:48', '2018-05-17 07:23:48'),
(17, 'Kentucky ', 'KY', '2018-05-17 07:24:02', '2018-05-17 07:24:02'),
(18, 'Louisiana ', 'LA', '2018-05-17 07:24:18', '2018-05-17 07:24:18'),
(19, 'Maine ', 'ME', '2018-05-17 07:24:31', '2018-05-17 07:24:31'),
(20, 'Maryland ', 'MD', '2018-05-17 07:24:42', '2018-05-17 07:24:42'),
(21, 'Massachusetts ', 'MA', '2018-05-17 07:24:56', '2018-05-17 07:24:56'),
(22, 'Michigan ', 'MI', '2018-05-17 07:25:21', '2018-05-17 07:25:21'),
(23, 'Minnesota ', 'MN', '2018-05-17 07:25:32', '2018-05-17 07:25:32'),
(24, 'Mississippi ', 'MS', '2018-05-17 07:25:44', '2018-05-17 07:25:44'),
(25, 'Missouri ', 'MO', '2018-05-17 07:25:57', '2018-05-17 07:25:57'),
(26, 'Montana ', 'MT', '2018-05-17 07:26:07', '2018-05-17 07:26:07'),
(27, 'Nebraska ', 'NE', '2018-05-17 07:26:21', '2018-05-17 07:26:21'),
(28, 'Nevada ', 'NV', '2018-05-17 07:26:35', '2018-05-17 07:26:35'),
(29, 'New Hampshire', 'NH', '2018-05-17 07:26:52', '2018-05-17 07:26:52'),
(30, 'New Jersey', 'NJ', '2018-05-17 07:27:06', '2018-05-17 07:27:06'),
(31, 'New Mexico', 'NM', '2018-05-17 07:27:21', '2018-05-17 07:27:21'),
(32, 'New York', 'NY', '2018-05-17 07:27:33', '2018-05-17 07:27:33'),
(33, 'North Carolina', 'NC', '2018-05-17 07:27:53', '2018-05-17 07:27:53'),
(34, 'North Dakota ', 'ND', '2018-05-17 07:28:09', '2018-05-17 07:28:09'),
(35, 'Ohio ', 'OH', '2018-05-17 07:28:19', '2018-05-17 07:28:19'),
(36, 'Oklahoma ', 'OK', '2018-05-17 07:28:32', '2018-05-17 07:28:32'),
(37, 'Oregon ', 'OR', '2018-05-17 07:28:44', '2018-05-17 07:28:44'),
(38, 'Pennsylvania ', 'PA', '2018-05-17 07:29:20', '2018-05-17 07:29:20'),
(39, 'Rhode Island', 'RI', '2018-05-17 07:29:37', '2018-05-17 07:29:37'),
(40, 'South Carolina', 'SC', '2018-05-17 07:29:48', '2018-05-17 07:29:48'),
(41, 'South Dakota', 'SD', '2018-05-17 07:29:59', '2018-05-17 07:29:59'),
(42, 'Tennessee ', 'TN', '2018-05-17 07:30:10', '2018-05-17 07:30:10'),
(43, 'Texas ', 'TX', '2018-05-17 07:30:24', '2018-05-17 07:30:24'),
(44, 'Utah ', 'UT', '2018-05-17 07:30:34', '2018-05-17 07:30:34'),
(45, 'Vermont ', 'VT', '2018-05-17 07:30:43', '2018-05-17 07:30:43'),
(46, 'Virginia ', 'VA', '2018-05-17 07:30:56', '2018-05-17 07:30:56'),
(47, 'Washington ', 'WA', '2018-05-17 07:31:07', '2018-05-17 07:31:07'),
(48, 'West Virginia', 'WV', '2018-05-17 07:31:20', '2018-05-17 07:31:20'),
(49, 'Wisconsin ', 'WI', '2018-05-17 07:31:31', '2018-05-17 07:31:31'),
(50, 'Wyoming ', 'WY', '2018-05-17 07:31:42', '2018-05-17 07:31:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 0,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `position_id` bigint(20) UNSIGNED DEFAULT NULL,
  `photoStaff_id` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `skype` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `is_active`, `role_id`, `position_id`, `photoStaff_id`, `bio`, `phone`, `skype`, `facebook`, `twitter`) VALUES
(1, 'Sam Kerr', 'samker@envirogreen.com', NULL, '$2y$10$Z0VEnobYEJzB3kRgZqoUhO5n5rPn9EduxN1kH.3q41dEFyz007rdy', 'gQjBnyuaDm6xdcSNF5WdXo6z186IHd3jSWs92kQLYtdqYFlJS6bbVMKNiHib', '2018-03-06 14:03:39', '2024-04-28 01:56:14', 0, 1, 1, '1', 'Lorem ipsum dolor amet twee elit shoreditch palo santo labore gluten-free craft beer literally photo booth 3 wolf moon nulla. Mlkshk edison bulb raw denim pickled adipisicing velit minim bushwick wolf. Twee bespoke microdosing waistcoat. Squid 8-bit dolor', '4137888888', 'sam', NULL, NULL),
(2, 'Mike Luger', 'luger@envirogreen.com', NULL, '$2y$10$AD/pkMnE7yU89tdLCgka/ecb5l1oszW02flLQM8qw9pl8udq9v/z2', NULL, '2018-03-06 14:05:45', '2018-03-06 14:05:45', 0, 1, 1, '2', 'Coloring book umami organic, gluten-free consectetur banh mi humblebrag poutine street art shabby chic. Yr blue bottle man braid beard cupidatat neutra. Ipsum poke ullamco, occaecat tote bag selvage hot chicken coloring book art party ea. Distillery volup', '4125555555', 'luger', NULL, NULL),
(3, 'Jane Kennedy', 'jane@envirogreen.com', NULL, '$2y$10$Z0VEnobYEJzB3kRgZqoUhO5n5rPn9EduxN1kH.3q41dEFyz007rdy', NULL, '2018-03-06 14:38:06', '2024-04-30 02:18:03', 0, 5, 2, '10', 'Kale chips occupy enamel pin, dolore austin chicharrones pickled quis. Whatever dolore cupidatat ut, williamsburg kickstarter wolf wayfarers direct trade authentic exercitation squid man braid keytar. Trust fund try-hard umami irony food truck deep v. Dir', '413-569-5569', 'jane', NULL, NULL),
(4, 'Dylan Cougar', 'dylancougar@envirogreen.com', NULL, '$2y$10$eiY3AIVMIpoLF8W4V0SiFusqMYjsCcm1368ChGwIK/gJm00vXTRTy', NULL, '2018-03-06 14:41:17', '2018-03-31 09:55:45', 0, 1, 4, '11', 'Kale chips occupy enamel pin, dolore austin chicharrones pickled quis. Whatever dolore cupidatat ut, williamsburg kickstarter wolf wayfarers direct trade authentic exercitation squid man braid keytar. Trust fund try-hard umami irony food truck deep v. Dir', '413-669-6969', 'dylan', NULL, NULL),
(6, 'Anne Hartly', 'hart@envirogreen.com', NULL, '$2y$10$U/Mz1cdLBo0T7ujkiLWGfOPhAqEuFgYBofNS2r4ZKmZ3jbBYA4az2', NULL, '2018-03-31 09:56:12', '2024-04-28 02:23:02', 0, 2, 2, '12', 'Pour-over pickled pitchfork fanny pack laborum la croix. Mixtape dolor enim, hashtag culpa green juice organic yuccie sustainable. Cred sed locavore chartreuse. Non roof party brooklyn woke consequat vape blog dolore la croix post-ironic kitsch flexitaria', '5555555', 'hart', NULL, NULL),
(7, 'Jane Bliss', 'bliss@envirogreen.com', NULL, '$2y$10$Q9jIXr.oXA6mwqGWJrlxvuTY.nDwcPoY2TgHOYdHP1Wce9UQh2ILK', NULL, '2018-03-31 09:57:22', '2024-04-28 00:42:00', 0, 2, 2, '13', 'Fixie shoreditch chartreuse affogato, duis taiyaki enim taxidermy leggings vinyl. Jianbing small batch sint hammock XOXO tattooed ennui kogi. Yuccie hashtag cronut try-hard proident esse culpa selvage succulents lorem lyft. Artisan edison bulb wayfarers, ', '5555555', 'jane', 'facebook/ja-bliss', 'twitter/j-bliss'),
(9, 'Steven Sherner', 'shern@envirogreen.com', NULL, '$2y$10$EB/B6T6SqEuvcvZsnPNypuCLvK7GgY/8ZiLaSuCZRv.Z5olGtSYbS', NULL, '2018-03-31 09:59:29', '2018-03-31 09:59:29', 0, 2, 3, '15', 'Coloring book umami organic, gluten-free consectetur banh mi humblebrag poutine street art shabby chic. Yr blue bottle man braid beard cupidatat neutra. Ipsum poke ullamco, occaecat tote bag selvage hot chicken coloring book art party ea. Distillery volup', '5555555', 'shern', NULL, NULL),
(10, 'Tommy Kane', 'kane@envirogreen.com', NULL, '$2y$10$yYj7rS2Q2wnlZu5KS7OpwuY6G2BzXLYGwrMnh91uokQCGDs02.hF.', '3LGQRXDTsJuUBSY85DRk0otCfzKn1c9JdHEkK8EN0WxkzJwQu0I4pwoxl8l5', '2018-03-31 10:00:47', '2018-03-31 10:08:45', 0, 2, 3, '16', 'Non roof party brooklyn woke consequat vape blog dolore la croix post-ironic kitsch flexitarian vaporware heirloom ut. Mumblecore try-hard laborum kale chips hoodie godard labore tacos meggings banh mi nulla.', '5555555', 'kane', NULL, NULL),
(11, 'Randy Lords', 'randy@envirogreen.com', NULL, '$2y$10$5p10aCYXEvtrzpKeENxlQ.i2klqtAl2hw69GDyxkL0BNMNybzFPHa', NULL, '2018-03-31 10:02:09', '2018-03-31 10:02:09', 0, 2, 3, '17', 'Meh elit air plant four dollar toast ennui asymmetrical fugiat cred laborum. Before they sold out lomo bicycle rights gastropub sustainable polaroid scenester blue bottle et.', '5555555', 'randy', NULL, NULL),
(12, 'Tammy Landis', 'landis@envirogreen.com', NULL, '$2y$10$8nftcl0ChTHw.bglKShiEu4YJInlrBOSd6MeL9zkTWxLynID9FlB.', NULL, '2018-03-31 10:05:02', '2018-03-31 10:05:02', 0, 2, 3, '18', 'Kale chips occupy enamel pin, dolore austin chicharrones pickled quis. Whatever dolore cupidatat ut, williamsburg kickstarter wolf wayfarers direct trade authentic exercitation squid man braid keytar. Trust fund try-hard umami irony food truck deep v. Dir', '55544454', 'landis', NULL, NULL),
(13, 'Greg Handler', 'greg@envirogreen.com', NULL, '$2y$10$NoFIPDSPbEVOlbFkGSHfsOm3aGQjiicR5eW6EXuqTz0DSLjt4xi7m', NULL, '2018-03-31 10:06:24', '2018-03-31 10:06:24', 0, 2, 2, '19', 'Direct trade art party scenester vice, dolor food truck irony celiac XOXO sunt. Mumblecore austin craft beer dolore brunch, poke crucifix in. Raw denim ullamco 3 wolf moon ugh. ', '7777777', 'greg', NULL, NULL),
(14, 'Johnny Bristol', 'bristol@envirogreen.com', NULL, '$2y$10$6OZxGC1/F/u/DdHez5yJl.aCSdJCwfvBxa.kjoo72SfvAqKCscKQm', NULL, '0000-00-00 00:00:00', '2018-03-31 10:07:37', 0, 1, 4, '20', 'Coloring book umami organic, gluten-free consectetur banh mi humblebrag poutine street art shabby chic. Yr blue bottle man braid beard cupidatat neutra. Ipsum poke ullamco, occaecat tote bag selvage hot chicken coloring book art party ea. Distillery volup', '9999999', 'bristol', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `property_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `property_id`, `created_at`, `updated_at`) VALUES
(1, 3, 30, '2024-04-30 02:37:24', NULL),
(2, 3, 5, '2024-04-30 02:38:38', NULL),
(3, 3, 6, '2024-04-30 02:39:00', NULL),
(4, 3, 8, '2024-05-03 02:19:23', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_photo_fours`
--
ALTER TABLE `extra_photo_fours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_photo_ones`
--
ALTER TABLE `extra_photo_ones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_photo_threes`
--
ALTER TABLE `extra_photo_threes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_photo_twos`
--
ALTER TABLE `extra_photo_twos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listings_fullpic_id_index` (`fullpic_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `photoslisting`
--
ALTER TABLE `photoslisting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photosstaff`
--
ALTER TABLE `photosstaff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_index` (`user_id`),
  ADD KEY `posts_category_id_index` (`category_id`),
  ADD KEY `posts_photo_id_index` (`photo_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_index` (`role_id`),
  ADD KEY `users_position_id_index` (`position_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `extra_photo_fours`
--
ALTER TABLE `extra_photo_fours`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `extra_photo_ones`
--
ALTER TABLE `extra_photo_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `extra_photo_threes`
--
ALTER TABLE `extra_photo_threes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `extra_photo_twos`
--
ALTER TABLE `extra_photo_twos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `photoslisting`
--
ALTER TABLE `photoslisting`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `photosstaff`
--
ALTER TABLE `photosstaff`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
