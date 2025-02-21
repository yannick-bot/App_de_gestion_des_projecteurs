const express = require('express');
const { getAllProjecteurs, getProjecteurById, createProjecteur, updateProjecteur, deleteProjecteur } = require('../controllers/projecteursController');

const router = express.Router();


// Récupérer tous les projecteurs
router.get('/public/projectors', getAllProjecteurs);

// Récupérer un projecteur par ID
router.get("/public/projectors/:id", getProjecteurById);

// Créer un projecteur
router.post("/admin/projectors/", createProjecteur);

//  Modifier un projecteur
router.put("/admin/projectors/:id", updateProjecteur);

// Supprimer un projecteur
router.delete("/admin/projectors/:id", deleteProjecteur);

module.exports = router;