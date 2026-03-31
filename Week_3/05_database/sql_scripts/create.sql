-- You can replace 'wskcats' with your desired database name
DROP DATABASE IF EXISTS wskcats;
CREATE DATABASE wskcats;
USE wskcats;

-- Replace 'wskuser' and 'mypasswo' with your desired username and password (DO NOT USE YOUR METROPOLIA CREDENTIALS)
CREATE USER 'wskuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `wskcats`.* TO 'wskuser'@'localhost';
FLUSH PRIVILEGES;