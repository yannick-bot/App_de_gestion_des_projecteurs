const express = require("express");
//const db = require("../src/db");
const db = require('../src/dbConfig');

const router = express.Router();

// Récupérer tous les projecteurs
router.get("/public/projectors", (req, res) => {
  db.query("SELECT * FROM Projecteur", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// Ajouter un projecteur
router.post("/admin/projectors", (req, res) => {
  const { reference, etat, disponibilite } = req.body;
  db.query(
    "INSERT INTO Projecteur (reference, etat, disponibilite) VALUES (?, ?, ?)",
    [reference, etat, disponibilite],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Projecteur ajouté avec succès", id: result.insertId, reference, etat, disponibilite });
    }
  );
});

// Mettre à jour un projecteur
router.put("/admin/projectors/:id", (req, res) => {
  const { reference, etat, disponibilite } = req.body;
  db.query(
    "UPDATE Projecteur SET reference = ?, etat = ?, disponibilite = ? WHERE id = ?",
    [reference, etat, disponibilite, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Projecteur mis à jour avec succès" });
    }
  );
});

// Supprimer un projecteur
router.delete("/admin/projectors/:id", (req, res) => {
  db.query("DELETE FROM Projecteur WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Projecteur supprimé avec succès" });
  });
});

module.exports = router;
