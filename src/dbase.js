require("dotenv").config(); // Charge les variables d'environnement

const mysql = require("mysql2");
const fs = require("fs");

const sql = fs.readFileSync("./src/db.sql", 'utf8');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL !");
});

connection.query(sql, (err) => {
  if (err) {
    console.error("Erreur lors de l'exécution du script SQL :", err);
    return;
  }
  console.log("Base de données et tables créées avec succès !");
});

module.exports = connection;
