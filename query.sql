

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

INSERT INTO users (firstName, lastName, email, phone, role, password, image, createdAt, updatedAt)
VALUES
   ('John', 'Doe', 'john.doe@example.com', '+998901234567', 'user', 'hashed_password_1', 'john_doe.jpg', NOW(), NOW()),
   ('Jane', 'Smith', 'jane.smith@example.com', '+998909876543', 'seo', 'hashed_password_2', 'jane_smith.jpg', NOW(), NOW()),
   ('Alice', 'Johnson', 'alice.johnson@example.com', '+998901112233', 'admin', 'hashed_password_3', 'alice_johnson.jpg', NOW(), NOW()),
   ('Bob', 'Brown', 'bob.brown@example.com', '+998907654321', 'user', 'hashed_password_4', 'bob_brown.jpg', NOW(), NOW()),
   ('Charlie', 'Miller', 'charlie.miller@example.com', '+998905555555', 'user', 'hashed_password_5', 'charlie_miller.jpg', NOW(), NOW()),
   ('David', 'Wilson', 'david.wilson@example.com', '+998904444444', 'seo', 'hashed_password_6', 'david_wilson.jpg', NOW(), NOW()),
   ('Emma', 'Moore', 'emma.moore@example.com', '+998903333333', 'admin', 'hashed_password_7', 'emma_moore.jpg', NOW(), NOW()),
   ('Frank', 'Taylor', 'frank.taylor@example.com', '+998902222222', 'user', 'hashed_password_8', 'frank_taylor.jpg', NOW(), NOW()),
   ('Grace', 'Anderson', 'grace.anderson@example.com', '+998901111111', 'seo', 'hashed_password_9', 'grace_anderson.jpg', NOW(), NOW()),
   ('Henry', 'Thomas', 'henry.thomas@example.com', '+998909999999', 'admin', 'hashed_password_10', 'henry_thomas.jpg', NOW(), NOW());


INSERT INTO resources (userId, categoryId, name, description, media, image, createdAt, updatedAt)
VALUES
   (1, 2, 'React Basics', 'Introduction to React fundamentals', 'react_course.mp4', 'react_thumbnail.jpg', NOW(), NOW()),
   (2, 1, 'Node.js Guide', 'Comprehensive guide to Node.js', 'node_course.pdf', 'node_thumbnail.jpg', NOW(), NOW()),
   (3, 3, 'JavaScript ES6', 'Learn modern JavaScript features', 'js_es6_tutorial.mp3', 'js_thumbnail.jpg', NOW(), NOW()),
   (4, 2, 'MongoDB Intro', 'Database management with MongoDB', 'mongodb_guide.docx', 'mongo_thumbnail.jpg', NOW(), NOW()),
   (4, 1, 'CSS Flexbox', 'Mastering CSS Flexbox for layouts', 'css_flexbox_course.mp4', 'css_thumbnail.jpg', NOW(), NOW()),
   (4, 4, 'Python Basics', 'Beginner-friendly Python course', 'python_basics.pdf', 'python_thumbnail.jpg', NOW(), NOW()),
   (4, 5, 'Docker for DevOps', 'Understanding Docker and containers', 'docker_devops.mp4', 'docker_thumbnail.jpg', NOW(), NOW()),
   (1, 2, 'Git & GitHub', 'Version control with Git', 'git_github_guide.pdf', 'git_thumbnail.jpg', NOW(), NOW()),
   (2, 3, 'MySQL Database', 'SQL fundamentals and queries', 'mysql_course.mp4', 'mysql_thumbnail.jpg', NOW(), NOW()),
   (3, 1, 'Express.js Crash Course', 'Building backend APIs with Express', 'express_crash_course.mp4', 'express_thumbnail.jpg', NOW(), NOW()),
   (1, 4, 'Vue.js Basics', 'Introduction to Vue.js framework', 'vue_basics.mp4', 'vue_thumbnail.jpg', NOW(), NOW()),
   (2, 5, 'Kubernetes Essentials', 'Managing containers with Kubernetes', 'kubernetes_guide.pdf', 'kubernetes_thumbnail.jpg', NOW(), NOW()),
   (3, 1, 'Advanced TypeScript', 'TypeScript deep dive', 'typescript_advanced.mp4', 'typescript_thumbnail.jpg', NOW(), NOW()),
   (4, 3, 'Django Framework', 'Web development with Django', 'django_course.pdf', 'django_thumbnail.jpg', NOW(), NOW()),
   (5, 2, 'Next.js Guide', 'Server-side rendering with Next.js', 'nextjs_tutorial.mp4', 'nextjs_thumbnail.jpg', NOW(), NOW());
