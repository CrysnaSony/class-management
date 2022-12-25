const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const app = express();
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const resultRouter = require("./routes/result");
app.use(express.json());
app.use(cors());

app.use(studentRouter);
app.use(teacherRouter);
app.use(resultRouter);
module.exports = app;
