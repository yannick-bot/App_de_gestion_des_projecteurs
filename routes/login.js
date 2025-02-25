const express = require('express');
const router = express.Router();
const connection = require("../src/dbConfig");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Schema for validating a POST/PUT request on a user with the Joi library
const userSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .message("Invalid email")
    .required(),
  password: Joi.string()
    .trim()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
      )
    )
    .message(
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    )
    .required(),
});

router.post("/public/login", async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;
  const query = "SELECT id, email, password FROM USER WHERE email = ?";
  const [result] = await connection.promise().query(query, [email]);

  if (result.length === 0) {
    return res.status(404).json({ error: "Wrong email or password!" });
  }

  const match = await bcrypt.compare(password, result[0].password);
  if (match) {
    const payload = {
      userId: result[0].id,
      email: result[0].email,
      role: result[0].role, // Ajout du rôle de l'utilisateur dans le token
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Successfully logged in", auth: token });
  } else {
    return res.status(404).json({ error: "Wrong email or password!" });
  }
});

module.exports = router;
