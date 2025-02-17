-- Active: 1737689992095@@127.0.0.1@3306@fullstackexam


SHOW tables;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    role ENUM('user', 'seo', 'admin') NOT NULL,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

INSERT INTO users (firstName, lastName, email, phone, role, password, image) VALUES
('John', 'Doe', 'john.doe@example.com', '+998901234567', 'user', 'hashed_password_1', 'john_doe.jpg'),
('Alice', 'Smith', 'alice.smith@example.com', '+998909876543', 'seo', 'hashed_password_2', 'alice_smith.jpg'),
('Bob', 'Johnson', 'bob.johnson@example.com', '+998907654321', 'admin', 'hashed_password_3', 'bob_johnson.jpg'),
('Charlie', 'Brown', 'charlie.brown@example.com', '+998905555555', 'user', 'hashed_password_4', 'charlie_brown.jpg');

CREATE TABLE centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    regionId INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    seoId INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (regionId) REFERENCES regions(id) ON DELETE CASCADE,
    FOREIGN KEY (seoId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO centers (name, regionId, address, seoId, image) VALUES
('Center One', 1, '123 Main St', 2, 'center_one.jpg'),
('Center Two', 2, '456 Elm St', 3, 'center_two.jpg'),
('Center Three', 3, '789 Oak St', 4, 'center_three.jpg'),
('Center Four', 1, '101 Pine St', 2, 'center_four.jpg'),
('Center Five', 2, '202 Maple St', 3, 'center_five.jpg');

INSERT INTO categories (name, image) VALUES
('Dasturlash asoslari', 'https://example.com/images/programming-basics.jpg'),
('Web Dasturlash', 'https://example.com/images/web-development.jpg'),
('Mobil Dasturlash', 'https://example.com/images/mobile-development.jpg'),
('Sun\'iy Intellekt', 'https://example.com/images/artificial-intelligence.jpg'),
('Ma\'lumotlar Tahlili', 'https://example.com/images/data-analysis.jpg'),
('Kiberxavfsizlik', 'https://example.com/images/cybersecurity.jpg'),
('Bulutli Texnologiyalar', 'https://example.com/images/cloud-computing.jpg'),
('DevOps', 'https://example.com/images/devops.jpg'),
('Dasturiy Ta\'minot Muhandisligi', 'https://example.com/images/software-engineering.jpg'),
('O\'yin Dasturlash', 'https://example.com/images/game-development.jpg'),
('Ma\'lumotlar Bazasi', 'https://example.com/images/database.jpg'),
('Blockchain Texnologiyalari', 'https://example.com/images/blockchain.jpg'),
('Internet of Things (IoT)', 'https://example.com/images/iot.jpg'),
('Machine Learning', 'https://example.com/images/machine-learning.jpg'),
('Deep Learning', 'https://example.com/images/deep-learning.jpg'),
('Frontend Dasturlash', 'https://example.com/images/frontend.jpg'),
('Backend Dasturlash', 'https://example.com/images/backend.jpg'),
('Full Stack Dasturlash', 'https://example.com/images/full-stack.jpg'),
('UI/UX Dizayn', 'https://example.com/images/ui-ux.jpg'),
('Robototexnika', 'https://example.com/images/robotics.jpg'),
('Big Data', 'https://example.com/images/big-data.jpg'),
('Data Science', 'https://example.com/images/data-science.jpg'),
('Python Dasturlash', 'https://example.com/images/python.jpg'),
('Java Dasturlash', 'https://example.com/images/java.jpg'),
('JavaScript Dasturlash', 'https://example.com/images/javascript.jpg'),
('C++ Dasturlash', 'https://example.com/images/cpp.jpg'),
('C# Dasturlash', 'https://example.com/images/csharp.jpg'),
('PHP Dasturlash', 'https://example.com/images/php.jpg'),
('Swift Dasturlash', 'https://example.com/images/swift.jpg'),
('Kotlin Dasturlash', 'https://example.com/images/kotlin.jpg');

INSERT INTO regions (name) VALUES
('Nukus'),
('Toshkent'),
('Samarqand'),
('Buxoro'),
('Andijon'),
('Namangan'),
('Fargʻona'),
('Qarshi'),
('Jizzax'),
('Navoiy'),
('Urganch'),
('Xiva'),
('Guliston'),
('Termiz'),
('Margʻilon'),
('Angren'),
('Chirchiq'),
('Olmaliq'),
('Shahrisabz'),
('Qoʻqon'),
('Zarafshon'),
('Kattaqoʻrgʻon'),
('Denov'),
('Koson'),
('Kitob'),
('Parkent'),
('Ohangaron'),
('Bekobod'),
('Yangiyoʻl'),
('Chust');