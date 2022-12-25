const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/result", async (req, res) => {
  console.log(req.body);
  const result = new Result(req.body);

  await result
    .save()
    .then(() => res.send("result saved"))
    .catch((err) => res.status(400).send(err));
});

router.get("/result/:id", async (req, res) => {
  const result = await Result.find({ studentId: req.params.id });
  if (!result) return res.status(400).send("Error fetching data");
  res.send(result);
});

module.exports = router;
