DROP DATABASE IF EXISTS digital_humanities;

CREATE DATABASE digital_humanities;

USE digital_humanities;


CREATE TABLE digital_humanities.user (
	`uid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(25) NOT NULL,
	`password` VARCHAR(25) NOT NULL,
	PRIMARY KEY (`s_uid`)
);

CREATE TABLE digital_humanities.user_meta (
	`uid` INT UNSIGNED NOT NULL,
	`first_name` VARCHAR(20) NOT NULL,
	`last_name` VARCHAR(20) NOT NULL,
	`email` VARCHAR(30) NOT NULL,
	`school_link` TINYINT(1) NOT NULL,
	`school_name` VARCHAR(35),
	`icon` BLOB NOT NULL,
		PRIMARY KEY (`uid`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`)
);

CREATE TABLE digital_humanities.global_user_rights (
	`uid` INT UNSIGNED NOT NULL,
	`total_ban` TINYINT(1),
	`temp_ban` TINYINT(1),
	`ban_end` DATETIME,
		PRIMARY KEY (`uid`),
	 FOREIGN KEY (`uid`) REFERENCES user(`uid`)
);

CREATE TABLE digital_humanities.render_type_scaler (
	`render_type_scaler` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`render_type_scaler`)
); /*Tells scripts how to scale*/

CREATE TABLE digital_humanities.render_type_draw (
	`render_type_draw_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`render_type_draw_id`)
); /*Point-To-Point, heatmap. The kind of drawing were looking for from the data_type*/

CREATE TABLE digital_humanities.data_type (
	`data_type_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`render_type_draw_id `INT UNSIGNED NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`desc` VARCHAR(255) NOT NULL,
		PRIMARY KEY (`data_type_id`),
	FOREIGN KEY (`render_type_draw_id`) REFERENCES render_type_draw(`render_type_id`)
); /*location, chart. What kind of data it is*/

CREATE TABLE digital_humanities.project_global (
	`proj_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`render_type_draw_id` INT UNSIGNED NOT NULL,
	`data_type_id` INT UNSIGNED NOT NULL,
	`num_inputs` TINYINT(14) NOT NULL,
	`filename` VARCHAR(60),
		PRIMARY KEY (`proj_id`),
	FOREIGN KEY (`render_type_draw_id`) REFERENCES render_type_draw(`render_type_draw_id`),
	FOREIGN KEY (`data_type_id`) REFERENCES data_type(`data_type_id`)
);

CREATE TABLE digital_humanities.project_meta_global (
	`uid` INT UNSIGNED NOT NULL,
	`project_meta_global` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`render_scaler_type` INT UNSIGNED NOT NULL,
	`proj_id` INT UNSIGNED NOT NULL,
	`upload` DATETIME NOT NULL,
	`col_names` VARCHAR(255) NOT NULL,
		PRIMARY KEY (`project_meta_global`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`render_type_scaler`) REFERENCES render_type_scaler(`render_type_scaler`),
	FOREIGN KEY (`proj_id`) REFERENCES project_global(`proj_id`)
);

CREATE TABLE digital_humanities.project_user_rights (
	`uid` INT UNSIGNED NOT NULL,
	`proj_id` INT UNSIGNED NOT NULL,
	`permissions` TINYINT(1) NOT NULL,
		PRIMARY KEY (`proj_id`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`proj_id`) REFERENCES project_global(`proj_id`)
);

CREATE TABLE digital_humanities.proj_membership (
	`uid` INT UNSIGNED NOT NULL,
	`proj_id` INT UNSIGNED NOT NULL,
	`role` TINYINT(1) NOT NULL,
		PRIMARY KEY (`proj_id`)
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`proj_id`) REFERENCES project_global(`proj_id`)
);

CREATE TABLE digital_humanities.collection (
	`collection_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`proj_id` INT UNSIGNED NOT NULL,
	`render_type_draw_id` INT UNSIGNED NOT NULL,
	`render_type_scale` INT UNSIGNED
	`data_type_id` INT UNSIGNED NOT NULL,
		PRIMARY KEY (`collection_id`),
	FOREIGN KEY (`proj_id`) REFERENCES project_global (`proj_id`),
	FOREIGN KEY (`render_type_draw_id`) REFERENCES render_type_draw(`render_type_draw_id`),
	FOREIGN KEY (`data_type_id`) REFERENCES data_type(`data_type_id`)	
);

CREATE TABLE digital_humanities.collection_membership (
	`uid` INT UNSIGNED NOT NULL,
	`collection_id` INT UNSIGNED NOT NULL,
	`role` TINYINT(1) NOT NULL,
		PRIMARY KEY (`collection_id`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`collection_id`) REFERENCES collection(`collection_id`)
);

CREATE TABLE digital_humanities.collection_meta (
	`collection_id` INT UNSIGNED NOT NULL,
	`uid` INT UNSIGNED NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`desc` TEXT,
	`upload` DATETIME NOT NULL,
		PRIMARY KEY (`collection_id`),
	FOREIGN KEY (`collection_id`) REFERENCES collection(`collection_id`),
	FOREIGN KEY (`uid`) REFERENCES user(`uid`)
);

CREATE TABLE digital_humanities.collection_user_rights (
	`uid` INT UNSIGNED NOT NULL,
	`collection_id` INT UNSIGNED NOT NULL,
	`permissions` TINYINT(1) NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES user(`uid`),
	FOREIGN KEY (`proj_id`) REFERENCES project_global(`proj_id`)
);

/*CREATE TABLE digital_humanities.overlay_scripts (
	`oscript_id` INT UNSIGNED NOT NULL ATUO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
	`filepath` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`oscript_id`)
);

when we have a folder of these overlay scripts, filename will be appended to some query that will inject it into the DOM.
These aren't in the build yet because we don't have any scripts to serve. 

CREATE TABLE digital_humanities.render_scripts (
	`rscript_id`INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`data_type_id`INT UNSIGNED NOT NULL,
	`name` VARCHAR(30) NOT NULL,
	`filepath` VARCHAR(50) NOT NULL,
		PRIMARY KEY (`rscript_id`),
	FOREIGN KEY (`data_type_id`) REFERENCES data_type(`data_type_id`)
);

To Do:
- Add a class table to sort people by school affiliation so we can see who exactly is from what school (?)
- Make an assignment table where teachers can make assignments for students in their class (?)
- Add tags to project_meta for search filtering
- Write a query that generates a new table based off the project_global tables and have THAT proj_id be indexed instead of the project storage table -- I think
- Figure out how the fuck project tables work
- Find Tupac
*/







