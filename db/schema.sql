DROP DATABASE IF EXISTS BLOG;
CREATE DATABASE BLOG;
SHOW GRANTS FOR 'root'@'localhost';

CREATE USER 'knguyen3531'@'localhost' IDENTIFIED BY 'Kennguyen13';

GRANT ALL PRIVILEGES ON BLOG.* TO 'knguyen3531'@'localhost';