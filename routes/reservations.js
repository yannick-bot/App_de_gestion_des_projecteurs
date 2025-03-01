const express = require("express");
const db = require('../src/dbConfig');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

// Récupérer toutes les réservations
router.get("/admin/reservations", (req, res) => {
  db.query(
    `SELECT Reservation.id, projecteur_id, hDebut, hFin, 
            User.prenom, User.nom, Projecteur.reference, Projecteur.etat 
     FROM Reservation
     JOIN User ON Reservation.user_id = User.id
     JOIN Projecteur ON Reservation.projecteur_id = Projecteur.id`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Créer une réservation (avec vérification de disponibilité)
router.post("/public/reservations", (req, res) => {
  const { user_id, projecteur_id, hDebut, hFin } = req.body;

  // Vérifions si le projecteur est disponible
  // Vérifions s'il reste au moins un projecteur disponible
  db.query("SELECT id FROM Projecteur WHERE disponibilite = TRUE LIMIT 1", (err, availableProjectors) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (availableProjectors.length === 0) {
      return res.status(400).json({ error: "Aucun projecteur disponible pour le moment" });
    }

    // Vérifions si le projecteur choisi est disponible
    db.query("SELECT disponibilite FROM Projecteur WHERE id = ?", [projecteur_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "Projecteur introuvable" });

      if (!results[0].disponibilite) {
        return res.status(400).json({ error: "Le projecteur est déjà réservé" });
      }

      // Insérer la réservation
      db.query(
        "INSERT INTO Reservation (user_id, projecteur_id, hDebut, hFin) VALUES (?, ?, ?, ?)",
        [user_id, projecteur_id, hDebut, hFin],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          // Mettre à jour la disponibilité du projecteur
          db.query(
            "UPDATE Projecteur SET disponibilite = FALSE WHERE id = ?",
            [projecteur_id],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });
              res.status(201).json({ id: result.insertId, message: "Réservation effectuée !" });
            }
          );
        }
      );
    });
  });

});

// Annuler une réservation
router.delete("/admin/reservations/:id", verifyToken, (req, res) => {
  // Récupérer le projecteur de la réservation avant suppression
  db.query("SELECT projecteur_id FROM Reservation WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Réservation non trouvée" });

    const projecteur_id = results[0].projecteur_id;

    // Supprimer la réservation
    db.query("DELETE FROM Reservation WHERE id = ?", [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Libérer le projecteur
      db.query("UPDATE Projecteur SET disponibilite = TRUE WHERE id = ?", [projecteur_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Réservation annulée et projecteur libéré" });
      });
    });
  });
});

module.exports = router;
