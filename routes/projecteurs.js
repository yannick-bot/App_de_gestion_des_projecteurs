const express = require('express');
const { getAllProjecteurs, getProjecteurById, createProjecteur, updateProjecteur, deleteProjecteur } = require('../controllers/projecteursController');

const router = express.Router();


// Récupérer tous les projecteurs
router.get('/', getAllProjecteurs);

// Récupérer un projecteur par ID
router.get('/:id', getProjecteurById);

// Créer un projecteur
router.post('/', createProjecteur);

//  Modifier un projecteur
router.put('/:id', updateProjecteur);

// Supprimer un projecteur
router.delete('/:id', deleteProjecteur);

module.exports = router;