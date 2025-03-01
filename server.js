const express = require("express");
const axios = require("axios")
const { connection, initializeDatabase } = require("./src/dbConfig");
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

// Les rôles ADMIN et PROF

const createAdmin = async () => {
    try {
        const admin = await axios.post(
          "http://localhost:3000/api/public/register",
          {
            prenom: "John",
            nom: "Doe",
            email: "JohnDoe@gmail.com",
            password: "John@Admin25",
            role: "ADMIN",
          }
        );
        console.log("Création de l'ADMIN : ", admin.data)

    } catch (error) {
        console.error("Erreur lors de la création de l'ADMIN :", error.message);
    }
}

const createProf = async () => {
  try {
    const prof = await axios.post(
      "http://localhost:3000/api/public/register",
      {
        prenom: "John",
        nom: "ALLADE",
        email: "Allade@gmail.com",
        password: "Allade@Admin25",
        role: "PROF",
      }
    );
    console.log("Ajout du Professeur : ", prof.data);
  } catch (error) {
    console.error("Erreur lors de l'ajout du professeur :", error.message);
  }
};

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    createAdmin()
    createProf()
});
