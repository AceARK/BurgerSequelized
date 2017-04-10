CREATE DATABASE sequelized_burgers_db;

USE sequelized_burgers_db;

CREATE TABLE burgers(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	burger_name VARCHAR(500) NOT NULL,
	devoured BOOLEAN DEFAULT false
);

INSERT INTO burgers (burger_name, devoured) VALUES ('Big Mac', false);
INSERT INTO burgers (burger_name, devoured) VALUES ('Spicy Chicken Sandwich', false);
INSERT INTO burgers (burger_name, devoured) VALUES ('Burger King Whopper', false);