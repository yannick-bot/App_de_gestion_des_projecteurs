const express = require("express");
const { verifyToken, checkRole } = require("../middlewares/auth");
const router = express.Router();

// Route admin protégée : Accessible uniquement aux administrateurs
router.get("/dashboard", verifyToken, checkRole("admin"), (req, res) => {
    res.status(200).json({ 
        message: "Bienvenue sur le tableau de bord administrateur",
        user: req.user // Contient l'utilisateur grâce au middleware
    });
});

module.exports = router;
