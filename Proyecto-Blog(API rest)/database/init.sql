CREATE DATABASE blog;

USE blog;


DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    contentCom VARCHAR(500) NOT NULL,
    articles_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    deleted BOOLEAN
    FOREIGN KEY (articles_id) REFERENCES articles(id)
);

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comments_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR (100) NOT NULL,
    contentArt VARCHAR (500),
    published_at DATETIME,
    created_at DATETIME NOT NULL,
    deleted BOOLEAN
    FOREIGN KEY (comments_id) REFERENCES comments(id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(150) NOT NULL,
    role INT NOT NULL,
    deleted BOOLEAN
);

DROP TABLE IF EXISTS articles_comments_user;
CREATE TABLE articles_comments_user(
    id INT PRIMARY KEY AUTO_INCREMENT,
    articles_id INT NOT NULL,
    comments_id INT NOT NULL,
    user_id INT NOT NULL,
    contentComent VARCHAR (100) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);



