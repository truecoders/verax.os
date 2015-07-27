-- Adminer 4.1.0 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `verax`;
CREATE DATABASE `verax` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `verax`;

DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `text` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `blog_posts` (`id`, `user`, `category`, `title`, `text`, `created`) VALUES
(1,	180,	0,	'Хеллоу ворлд',	'\"Verax.os\"- гибкий движок сайта, который имеет в своей основе супер-героический JavaScript фреймворк Angularjs, Angular Material и php-фреймворк Slim для обработки серверных запросов. Так же использует dbHelper написанный Swadesh Behera, который значительно облегчает обращение к базе данных. В-общем, акцент делался на удобство разработки и \"одностраничность\" приложения. Дизайн - всем знакомый Material Design от компании Google (как и Angularjs, кстати). Встроены несколько тем с вариациями встроенных в MD цветовых палитр. Написана простая система роутинга с неперезагружаемым контроллером при смене URL. Все служебные роуты хранятся в массиве в контроллере. Пользовательские роуты хранятся в БД. Так же написано много вкусных \"плюшек\" для, опять же, удобства разработки и удобства использования администратором и пользователем. Написана система аутентикации/регистрации пользователей. TO DO => 1) Простой интегрированный форум 2) простой интегрированный блог 3) интегрированный интернет-магазин 4) склад товаров 5) систему продаж в реальном магазине',	'2015-07-24 12:56:18'),
(2,	180,	0,	'Хеллоу ворлд 2',	'\"Verax.os\"- гибкий движок сайта, который имеет в своей основе супер-героический JavaScript фреймворк Angularjs, Angular Material и php-фреймворк Slim для обработки серверных запросов. Так же использует dbHelper написанный Swadesh Behera, который значительно облегчает обращение к базе данных. В-общем, акцент делался на удобство разработки и \"одностраничность\" приложения. Дизайн - всем знакомый Material Design от компании Google (как и Angularjs, кстати). Встроены несколько тем с вариациями встроенных в MD цветовых палитр. Написана простая система роутинга с неперезагружаемым контроллером при смене URL. Все служебные роуты хранятся в массиве в контроллере. Пользовательские роуты хранятся в БД. Так же написано много вкусных \"плюшек\" для, опять же, удобства разработки и удобства использования администратором и пользователем. Написана система аутентикации/регистрации пользователей. TO DO => 1) Простой интегрированный форум 2) простой интегрированный блог 3) интегрированный интернет-магазин 4) склад товаров 5) систему продаж в реальном магазине',	'2015-07-25 15:12:33'),
(3,	180,	0,	'Хеллоу ворлд 3',	'\"Verax.os\"- гибкий движок сайта, который имеет в своей основе супер-героический JavaScript фреймворк Angularjs, Angular Material и php-фреймворк Slim для обработки серверных запросов. Так же использует dbHelper написанный Swadesh Behera, который значительно облегчает обращение к базе данных. В-общем, акцент делался на удобство разработки и \"одностраничность\" приложения. Дизайн - всем знакомый Material Design от компании Google (как и Angularjs, кстати). Встроены несколько тем с вариациями встроенных в MD цветовых палитр. Написана простая система роутинга с неперезагружаемым контроллером при смене URL. Все служебные роуты хранятся в массиве в контроллере. Пользовательские роуты хранятся в БД. Так же написано много вкусных \"плюшек\" для, опять же, удобства разработки и удобства использования администратором и пользователем. Написана система аутентикации/регистрации пользователей. TO DO => 1) Простой интегрированный форум 2) простой интегрированный блог 3) интегрированный интернет-магазин 4) склад товаров 5) систему продаж в реальном магазине',	'2015-07-25 15:12:47');

DROP TABLE IF EXISTS `customers_auth`;
CREATE TABLE `customers_auth` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(1) NOT NULL DEFAULT '1',
  `secret` varchar(200) NOT NULL DEFAULT 'secret_key',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `customers_auth` (`uid`, `name`, `email`, `phone`, `password`, `address`, `city`, `created`, `role`, `secret`, `active`) VALUES
(169,	'Swadesh Behera',	'swadesh@gmail.com',	'1234567890',	'$2a$10$251b3c3d020155f7553c1ugKfEH04BD6nbCbo78AIDVOqS3GVYQ46',	'4092 Furth Circle',	'Singapore',	'2014-08-31 15:21:20',	'1',	'secret_key',	1),
(170,	'Ipsita Sahoo',	'ipsita@gmail.com',	'1111111111',	'$2a$10$d84ffcf46967db4e1718buENHT7GVpcC7FfbSqCLUJDkKPg4RcgV2',	'2, rue du Commerce',	'NYC',	'2014-08-31 15:30:58',	'1',	'secret_key',	1),
(171,	'Trisha Tamanna Priyadarsini',	'trisha@gmail.com',	'2222222222',	'$2a$10$c9b32f5baa3315554bffcuWfjiXNhO1Rn4hVxMXyJHJaesNHL9U/O',	'C/ Moralzarzal, 86',	'Burlingame',	'2014-08-31 15:32:03',	'1',	'secret_key',	1),
(172,	'Sai Rimsha',	'rimsha@gmail.com',	'3333333333',	'$2a$10$477f7567571278c17ebdees5xCunwKISQaG8zkKhvfE5dYem5sTey',	'897 Long Airport Avenue',	'Madrid',	'2014-08-31 17:34:21',	'1',	'secret_key',	1),
(173,	'Satwik Mohanty',	'satwik@gmail.com',	'4444444444',	'$2a$10$2b957be577db7727fed13O2QmHMd9LoEUjioYe.zkXP5lqBumI6Dy',	'Lyonerstr. 34',	'San Francisco\n',	'2014-08-31 17:36:02',	'1',	'secret_key',	1),
(174,	'Tapaswini Sahoo',	'linky@gmail.com',	'5555555555',	'$2a$10$b2f3694f56fdb5b5c9ebeulMJTSx2Iv6ayQR0GUAcDsn0Jdn4c1we',	'ul. Filtrowa 68',	'Warszawa',	'2014-08-31 17:44:54',	'1',	'secret_key',	1),
(175,	'Manas Ranjan Subudhi',	'manas@gmail.com',	'6666666666',	'$2a$10$03ab40438bbddb67d4f13Odrzs6Rwr92xKEYDbOO7IXO8YvBaOmlq',	'5677 Strong St.',	'Stavern\n',	'2014-08-31 17:45:08',	'1',	'secret_key',	1),
(178,	'AngularCode Administrator',	'admin@angularcode.com',	'0000000000',	'$2a$10$72442f3d7ad44bcf1432cuAAZAURj9dtXhEMBQXMn9C8SpnZjmK1S',	'C/1052, Bangalore',	'',	'2014-08-31 18:00:26',	'1',	'secret_key',	1),
(180,	'Якунин Евгений Викторович',	'mrjohn73rus@gmail.com',	'9788048355',	'$2a$10$5cdc279a1ad94744e7ce7e4P.WVTO6vG5dGhrf1f0CsfnjjjQCdki',	'Хрулева 24-22',	'Севастополь',	'2015-07-12 22:31:23',	'0',	'secret_key',	1),
(181,	'2121',	'john@web.ru',	'1212',	'$2a$10$6bc2ffc802139a322197aue4TEQgY2h7ITOvFtA3GwyzYaqF1uLYC',	'Хрулева 22',	'Севастополь',	'2015-07-12 22:43:29',	'1',	'secret_key',	1),
(188,	'Иришка',	'irina-avdi@mail.ru',	'9788050405',	'$2a$10$dc66c3a342fbfe1aecac0ub8oKD9D0arQxtJnf0AEK5EMA4f6DH2W',	'Макарова 16-45',	'Севастополь',	'2015-07-12 23:25:54',	'1',	'secret_key',	1),
(189,	'',	'john@ru',	'',	'$2a$10$4f24fa496591b9aab76d5eih.mje3CXs65xj523Xktd3uORVXNb1C',	'',	NULL,	'2015-07-13 14:44:28',	'1',	'secret_key',	1),
(190,	'',	'irina-avdi@mail.ru2',	'',	'$2a$10$4f2f7e5279367f7c1b55bOPeSgxXk4jLQAIF4cwPoi8vLXYkWxx2S',	'',	NULL,	'2015-07-15 09:08:56',	'1',	'secret_key',	1),
(191,	'21',	'mrjohn73rus@gmail.com2',	'1221122121',	'$2a$10$1724b8ac01a736ab53a53uYw1NxEkzDvgyiMrEzhrxGwAZswDAAKK',	'qwqw qwqw',	'qwe',	'2015-07-15 09:54:51',	'1',	'secret_key',	1),
(192,	'РОПВ',	'irina-avdi@mail.ru23',	'1111111111',	'$2a$10$66e8a6e5019504e68fdf2u91P6gXKtDL1a0vO4rVNCVI1Sq2Aso7W',	'в',	'3в',	'2015-07-22 16:58:41',	'1',	'secret_key',	1),
(193,	'34',	'ftyjfty@er',	'1231231231',	'$2a$10$774cba6be914a7d8791e7uPKVKCqDrRAYqfGu0HBWeoYlsif7vUE6',	'',	NULL,	'2015-07-23 15:21:08',	'1',	'secret_key',	1);

DROP TABLE IF EXISTS `customers_roles`;
CREATE TABLE `customers_roles` (
  `role_key` int(2) NOT NULL,
  `role_description` varchar(200) NOT NULL,
  `role_privileges` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `customers_roles` (`role_key`, `role_description`, `role_privileges`) VALUES
(0,	'Администратор',	'full'),
(1,	'Пользователь',	'frontend'),
(2,	'Оптовик',	'frontend, opt_prices'),
(3,	'Торговый представитель',	'frontend, opt_prices, admin_products, not_edit');

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_description` varchar(50) NOT NULL,
  `setting_name` varchar(25) NOT NULL,
  `value` text NOT NULL,
  `html` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `site_settings` (`id`, `setting_description`, `setting_name`, `value`, `html`) VALUES
(1,	'Тема оформления сайта',	'siteTheme',	'teal',	NULL),
(2,	'Слоган',	'siteLongName',	'\"In Verax Veritas\"',	NULL),
(3,	'Название сайта',	'siteName',	'Verax',	NULL),
(4,	'Описание сайта',	'siteDescription',	'<h1>Verax.os<br/></h1><p>&#34;Verax.os&#34;- гибкий движок сайта, который имеет в своей основе супер-героический JavaScript фреймворк Angularjs, Angular Material и php-фреймворк Slim для обработки серверных запросов. Так же использует dbHelper написанный Swadesh Behera, который значительно облегчает обращение к базе данных.</p><p>В-общем, акцент делался на удобство разработки и &#34;одностраничность&#34; приложения.Дизайн - всем знакомый Material Design от компании Google (как и Angularjs, кстати). Встроены несколько тем с вариациями встроенных в MD цветовых палитр.</p><p>Написана простая система роутинга с неперезагружаемым контроллером при смене URL. Все служебные роуты хранятся в массиве в контроллере. Пользовательские роуты хранятся в БД.</p><p>Так же написано много вкусных &#34;плюшек&#34; для, опять же, удобства разработки и удобства использования администратором и пользователем. Написана система аутентикации/регистрации пользователей.</p><p>TO DO =&gt; <br/></p><ol><li>Простой интегрированный форум</li><li><strike>простой интегрированный блог</strike></li><li>интегрированный интернет-магазин</li><li>склад товаров</li><li>систему продаж в реальном магазине</li></ol>',	'true');

-- 2015-07-26 06:17:57
