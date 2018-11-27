-- remove databases if exists
DROP DATABASE IF EXISTS localsecure_db;
-- create the table
CREATE DATABASE localsecure_db;

use localsecure_db;
drop table users;
drop table students;

-- add data
USE localsecure_db;
INSERT INTO users (username,password,email,createdAt,updatedAt)
VALUE("admin","admin","admin@library.com",now(),now());

USE localsecure_db;
INSERT INTO Students (name,email,createdAt,updatedAt)
VALUE("Aja","a@gmail.com",now(),now()),
("James","j@gmail.com",now(),now()),
("Daniel","d@gmail.com",now(),now()),
("Robert","r@gmail.com",now(),now());