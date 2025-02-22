-- USER

INSERT INTO User (prenom, nom, email, password, role) VALUES (?, ?, ?, ?, ?);

UPDATE User
SET nom = ?, prenom = ?, contact = ?, email = ?, password = ?
WHERE id = ? ;

DELETE FROM User WHERE id = ? ;

SELECT * FROM User;

-- PROJECTEUR

INSERT INTO Projecteur (reference, etat, disponibilite) VALUES (?, ?, ?);

-- Modifier l'etat(disponibilité) d'un projecteur
UPDATE Projecteur
SET disponibilite = ?
WHERE id = ? ;

DELETE FROM Projecteur WHERE id = ? ;

--lister les projecteurs disponibles 
SELECT reference, etat FROM Projecteur
WHERE disponibilite = true ;

-- lister tt les projecteurs
SELECT * FROM Projecteur;

-- RESERVATIONS

-- Réserver un projecteur pour un créneau donné
INSERT INTO Reservation VALUES (?, ?, ?, ?)

-- Lister les réservations
SELECT * FROM Reservation

-- Annuler une réservation
DELETE FROM Reservation WHERE id = ?