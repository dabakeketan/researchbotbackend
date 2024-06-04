CREATE DATABASE resarchbot;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULl,
    last_name VARCHAR(255) NOT NULL,
    UNIQUE(email)
);