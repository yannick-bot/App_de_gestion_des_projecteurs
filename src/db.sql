DROP DATABASE IF EXISTS Gestion_projo;

CREATE DATABASE Gestion_projo;

USE Gestion_projo;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Projecteur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reference VARCHAR(255) NOT NULL UNIQUE,
    etat VARCHAR(255) NOT NULL,
    disponibilite BOOLEAN DEFAULT TRUE
);

CREATE TABLE Reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    projecteur_id INT,
    hDebut DATETIME NOT NULL,
    hFin DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (projecteur_id) REFERENCES Projecteur(id)
);