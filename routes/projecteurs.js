const express = require("express");
const connexion = require('../src/dbConfig');
const { verifyToken } = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Récupérer tous les projecteurs
router.get("/public/projectors", (req, res) => {
  connexion.query("SELECT * FROM Projecteur", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Ajouter un projecteur
router.post("/admin/projectors", verifyToken, [
  body('reference').notEmpty().withMessage('Veuillez mentionner la référence du projecteur'),
  body('etat').notEmpty().withMessage('Veuillez mentionner l\'état du projecteur'),
  body('disponibilite').notEmpty().withMessage('Veuillez mentionner la disponibilité du projecteur')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { reference, etat, disponibilite } = req.body;
  connexion.query(
    "INSERT INTO Projecteur (reference, etat, disponibilite) VALUES (?, ?, ?)",
    [reference, etat, disponibilite],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Projecteur ajouté avec succès", id: result.insertId, reference, etat, disponibilite });
    }
  );
});

// Mettre à jour un projecteur
router.put("/admin/projectors/:id", verifyToken, [
  body('reference').notEmpty().withMessage('Veuillez mentionner la référence du projecteur'),
  body('etat').notEmpty().withMessage('Veuillez mentionner l\'état du projecteur'), 
  body('disponibilite').notEmpty().withMessage('Veuillez mentionner la disponibilité du projecteur')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { reference, etat, disponibilite } = req.body;
  connexion.query(
    "UPDATE Projecteur SET reference = ?, etat = ?, disponibilite = ? WHERE id = ?",
    [reference, etat, disponibilite, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Projecteur mis à jour avec succès" });
    }
  );
});

// Supprimer un projecteur
router.delete("/admin/projectors/:id", verifyToken, (req, res) => {
  connexion.query("DELETE FROM Projecteur WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Projecteur supprimé avec succès" });
  });
});

module.exports = router;
