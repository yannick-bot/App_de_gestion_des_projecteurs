require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({ message: "Aucun token fourni" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Échec de l'authentification du token" });
        }
        req.user = decoded; // Ajoute l'utilisateur décodé à `req.user`
        next();
    });
}

// Middleware pour vérifier le rôle de l'utilisateur
function checkRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "Accès refusé : vous n'avez pas les permissions nécessaires" });
        }
        next();
    };
}

module.exports = verifyToken;
