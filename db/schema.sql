-- ### Schema
DROP DATABASE if exists burger_db;
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(80) NOT NULL,
    devoured BOOLEAN
	PRIMARY KEY (id)
);