-- Active: 1737689992095@@127.0.0.1@3306@fullstackexam

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

UPDATE users SET role = "admin" where email="ibrahimovkamronbek7@gmail.com";


INSERT INTO users (firstName, lastName, email, phone, role, password, image, isActive, createdAt, updatedAt) VALUES
('John', 'Doe', 'john@example.com', '123456789', 'user', '12345', 'john.jpg', 1, NOW(), NOW()),
('Jane', 'Smith', 'jane@example.com', '987654321', 'user', '12345', 'jane.jpg', 1, NOW(), NOW()),
('Alice', 'Brown', 'alice@example.com', '555666777', 'user', '12345', 'alice.jpg', 1, NOW(), NOW()),

('Michael', 'Johnson', 'michael@example.com', '111222333', 'seo', '12345', 'michael.jpg', 1, NOW(), NOW()),
('Sarah', 'Williams', 'sarah@example.com', '444555666', 'seo', '12345', 'sarah.jpg', 1, NOW(), NOW()),
('David', 'Miller', 'david@example.com', '777888999', 'seo', '12345', 'david.jpg', 1, NOW(), NOW()),

('Robert', 'Davis', 'robert@example.com', '101112131', 'admin', '12345', 'robert.jpg', 1, NOW(), NOW()),
('Emily', 'Garcia', 'emily@example.com', '141516171', 'admin', '12345', 'emily.jpg', 1, NOW(), NOW()),
('Daniel', 'Martinez', 'daniel@example.com', '181920212', 'admin', '12345', 'daniel.jpg', 1, NOW(), NOW());

SELECT * from users

CREATE Table categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50), 
    image VARCHAR(200)
);

DROP Table categories;


SELECT * from users;