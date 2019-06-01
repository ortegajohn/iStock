DROP DATABASE IF EXISTS `istock_db`;
CREATE DATABASE `istock_db`;
USE `istock_db`;

DROP table if exists stocks;
CREATE TABLE `stocks` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`user_id`  long,
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

USE `istock_db`;
CREATE TABLE IF NOT EXISTS iStock_users(
    id              INT(5) AUTO_INCREMENT NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    username        VARCHAR(100) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY(id)
)ENGINE='InnoDB' CHARACTER SET utf8 COLLATE utf8_unicode_ci;
