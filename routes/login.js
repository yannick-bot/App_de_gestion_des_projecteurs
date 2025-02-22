const express = require('express');
const router = express.Router();

const connection = require("../src/dbConfig");
const bcrypt = require("bcrypt");
const Joi = require("joi");


const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// schéma pour valider une requête POST/PUT sur un user avec la bibliothèque Joi de npm
const userSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("e-mail invalide")
    .required(),
  password: Joi.string()
    .trim()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
      )
    )
    .message(
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    )
    .required(),
});

router.post("/public/login", async function (req, res) {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // on récupère l'email et le mot de passe
    const { email, password } = req.body;
    // on vérifie si le user existe
    const query =
      "SELECT id, email, password FROM USER WHERE email = ?";
    const [result] = await connection
        .promise()
        .query(query, [email]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Wrong email or password !" });
    }
    //on compare le mot de passe avec bcrypt
    const match = await bcrypt.compare(password, result[0].password);
    if (match) {
        // on génère le JWT
        const payload = {
          userId: result[0].id,
          email: result[0].email,
          password: result[0].password,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        // on retourne le JWT généré
        return res.status(200).json({ message: "Successfully logged", auth: token });
    } else {
        return res.status(404).json({ error: "Wrong email or password !" });
    }
});

module.exports = router;