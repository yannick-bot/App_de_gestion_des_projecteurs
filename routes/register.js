const express = require("express");
const router = express.Router();
const connection = require('../src/dbConfig')
const bcrypt = require("bcrypt");
const Joi = require('joi');
const saltRounds = 10;


// schéma pour valider une requête POST/PUT sur un user avec la bibliothèque Joi de npm
const userSchema = Joi.object({
  prenom: Joi.string()
    .trim()
    .min(3)
    .message("Le prenom doit contenir au moins 3 caractères")
    .required(),
  nom: Joi.string()
    .trim()
    .min(3)
    .message("Le nom doit contenir au moins 3 caractères")
    .required(),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("e-mail invalide")
    .required(),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"))
    .message('Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.')
    .required(),
});


router.post('/public/register', async function (req, res) {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // on récupère l'email et le mot de passe
  const { prenom, nom, email, password } = req.body;
  //on hache le mot de passe avec bcrypt
  const hash = await bcrypt.hash(password, saltRounds);
  // on vérifie si l'email et le mot de passe sont déja pris
  const verify =
    "SELECT email, password FROM User where email = ? OR password = ?";
  const [result1] = await connection
    .promise()
    .query(verify, [email, password]);
  if (result1.length === 1) {
    return res
      .status(400)
      .json({ message: "Email or password already taken" });
  }
  // on sauvegarde le user en base de données
  const query =
    "INSERT INTO User (prenom, nom, email, password) VALUES (?, ?, ?, ?)";
  const [result] = await connection
    .promise()
    .query(query, [prenom, nom, email, hash]);

  if (result.affectedRows === 1) {
    res.json({ message: "Successfully registered" });
  } else {
    res.status(400).json({ message: "Something went wrong. Please try again" });
  }
})

module.exports = router;