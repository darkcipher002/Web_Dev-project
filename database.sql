CREATE DATABASE IF NOT EXISTS strathmore_events_db;
USE strathmore_events_db;

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    admission_number VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    faculty VARCHAR(50) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    guest_passes INT NOT NULL,
    special_needs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);