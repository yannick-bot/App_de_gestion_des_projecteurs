const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authentification = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Accès non autorisé" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = decoded;
    next();
  });
};

module.exports = authentification;
