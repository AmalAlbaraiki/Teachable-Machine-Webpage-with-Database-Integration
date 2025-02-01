CREATE DATABASE teachable_machine_db;

USE teachable_machine_db;

CREATE TABLE detection_counter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    count INT DEFAULT 0
);

CREATE TABLE detection_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255),
    detection_count INT
);
