DROP DATABASE IF EXISTS `istock_db`;
CREATE DATABASE `istock_db`;
USE `istock_db`;

DROP table if exists stocks;
CREATE TABLE `stocks` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`ticker` VARCHAR( 255) NOT NULL,
	`price` long,
    createdAt datetime,
    updatedAt datetime,
	PRIMARY KEY ( `id` )
);
