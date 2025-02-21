const express = require("express");
const db = require("./src/dbase");
const usersRoute = require("./routes/users");
const projectorsRoute = require("./routes/projecteurs");
const reservationsRoute = require("./routes/reservations");

const app = express();

app.use(express.json());

app.use('/api', usersRoute);
app.use('/api', projectorsRoute);
app.use('/api', reservationsRoute);


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
