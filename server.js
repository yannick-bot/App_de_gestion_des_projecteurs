const express = require("express");
const db = require("./src/dbConfig");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const reservationsRoute = require("./routes/reservations");
const projecteursRoute = require("./routes/projecteurs");
const verifyToken = require("./middlewares/auth");
const app = express();

app.use(express.json());

app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', reservationsRoute);
app.use('/api', projecteursRoute);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;

app.get("/me", verifyToken, (req, res) => {
    res.status(200).json({ message: `Bonjour utilisateur ID: ${req.user.id}` });
});



app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
