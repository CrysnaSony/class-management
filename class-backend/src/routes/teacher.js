const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Teacher = require("../models/teacher");

router.post("/register", async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 8);
  const teacher = new Teacher({ email, password });
  await teacher.save();
  const token = await teacher.generateAuthToken();
  res.send({ teacher, token });
});

router.post("/login", async (req, res) => {
  try {
    const teacher = await Teacher.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await teacher.generateAuthToken();
    res.send({ teacher, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
