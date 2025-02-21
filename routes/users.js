const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Controller functions (you need to implement these)

// Récupérer tous les utilisateurs
router.get('/', getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', getUserById);

// Créer un utilisateur
router.post('/', createUser);

// Modifier un utilisateur
router.put('/:id', updateUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;