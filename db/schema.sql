DROP DATABASE IF EXISTS `istock_db`;
CREATE DATABASE `istock_db`;
USE `istock_db`;

DROP table if exists stocks;
CREATE TABLE `stocks` (
	``id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`ticker` VARCHAR( 255) NOT NULL,
	`name` VARCHAR ( 30 )
	`price` long,
	`open` long,
	`percentChange` long,
	`dayHigh` long,
	`dayLow` long,
	`marketCap` long,
    createdAt datetime,
    updatedAt datetime,
	PRIMARY KEY ( `id` )
);
