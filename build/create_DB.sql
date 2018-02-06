DROP DATABASE IF EXISTS digital_humanities;

CREATE DATABASE digital_humanities;

USE digital_humanities;

CREATE TABLE digital_humanities.user (
	`uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(20) NOT NULL,
	`password` CHAR(60) NOT NULL,
	change_flag TINYINT(1),
		PRIMARY KEY (`uid`),
	UNIQUE INDEX `uid_UNIQUE` (`uid` ASC),
	UNIQUE INDEX `username_UNIQUE` (`username` ASC)
);

CREATE TABLE digital_humanities.user_meta (
	`uid` INT UNSIGNED NOT NULL,
	`first_name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`uid`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`)
);

CREATE TABLE digital_humanities.membership (
	`uid` INT UNSIGNED NOT NULL,
	`role` VARCHAR(5),
	PRIMARY KEY (`uid`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`)
);

CREATE TABLE digital_humanities.data_type (
	`type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`desc` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`type_id`)
);

CREATE TABLE digital_humanities.data (
	`data_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`type` INT UNSIGNED NOT NULL,
	PRIMARY KEY (`data_id`)
);


CREATE TABLE digital_humanities.data_meta (
	`uid` INT UNSIGNED NOT NULL,
	`data_id` INT UNSIGNED NOT NULL,
	`upload_time` DATETIME,
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`data_id`) REFERENCES data(`data_id`)
);