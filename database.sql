CREATE DATABASE sportelia;

-- client table

CREATE TABLE client( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) unique NOT NULL,
    email VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- franchise table

CREATE TABLE franchise(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) unique NOT NULL,
    email VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR, 
    description TEXT, 
    isActive BOOLEAN
);


-- structure table

CREATE TABLE structure( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) unique NOT NULL,
    email VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR, 
    phone INT, 
    profile_pic VARCHAR, 
    description TEXT, 
    isActive BOOLEAN,
    franchise_id INT,
    boissons BOOLEAN,
    mailing BOOLEAN,
    premium BOOLEAN
);


ALTER TABLE structure 
ADD CONSTRAINT FK_franchise
FOREIGN KEY(franchise_id) REFERENCES franchise(id) 
ON DELETE RESTRICT 
ON UPDATE RESTRICT;