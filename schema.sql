-- ### Schema
CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(80) NOT NULL,
	PRIMARY KEY (id)
);
