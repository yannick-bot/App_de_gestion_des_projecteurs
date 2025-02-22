const express = require("express");
const db = require("../src/dbConfig");
//const usersRoute = require("../routes/users");
//const projectorsRoute = require("../routes/projecteurs");
//const reservationsRoute = require("../routes/reservations");
const registerRoute = require("../routes/register");
const loginRoute = require("../routes/login");

const app = express();

app.use(express.json());

app.use('/api', registerRoute);
app.use("/api", loginRoute);
//app.use('/api', usersRoute);
//app.use('/api', projectorsRoute);
//app.use('/api', reservationsRoute);


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
