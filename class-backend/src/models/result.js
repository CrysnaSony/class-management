const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const resultSchema = mongoose.Schema(
  {
    subject: {
      type: String,
    },
    marks: {
      type: Number,
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "result",
  }
);

const Result = mongoose.model("result", resultSchema);
module.exports = Result;
