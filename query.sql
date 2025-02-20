
CREATE DATABASE fullstackexam;

SELECT * FROM users;

UPDATE users set role = "admin" where id = 15;

SHOW TABLES;

DESC centers;

CREATE Table fields(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255)
);

INSERT INTO fields(name, image)
VALUES ("IT", "it.jpg"), ("Med", "med.jpg");

SELECT * FROM majors;

CREATE Table majors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    fieldId INT,
    Foreign Key (fieldId) REFERENCES fields (id)
);

INSERT INTO majors(name, image, `fieldId`)
VALUES ("fullstack", "web.jpg", 1), ("marketing", "smm.jpg", 1);

INSERT INTO regions (name) VALUES("Tashkent");

SELECT * FROM users;

UPDATE users SET role = "admin";
