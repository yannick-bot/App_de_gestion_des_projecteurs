const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Controller functions (you need to implement these)

// Récupérer tous les utilisateurs
router.get('/admin/users', getAllUsers);

// Récupérer un utilisateur par ID
router.get('/admin/users/:id', getUserById);

// Créer un utilisateur
router.post('/admin/users', createUser);

// Modifier un utilisateur
router.put('/admin/users/:id', updateUser);

// Delete a user
router.delete('/admin/users/:id', deleteUser);

module.exports = router;