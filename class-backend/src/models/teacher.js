const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "teacher",
  }
);

teacherSchema.methods.toJSON = function () {
  const teacher = this;
  const teacherObject = teacher.toObject();
  delete teacherObject.password;
  delete teacherObject.tokens;
  return teacherObject;
};
teacherSchema.methods.generateAuthToken = async function () {
  const teacher = this;
  const token = jwt.sign({ _id: teacher._id.toString() }, "classSecret");
  teacher.tokens = teacher.tokens.concat({ token });
  await teacher.save();
  return token;
};
teacherSchema.statics.findByCredentials = async (email, password) => {
  const teacher = await Teacher.findOne({ email });
  if (!teacher) throw new Error("Unable to login");
  const isMatch = await bcrypt.compare(password, teacher.password);
  if (!isMatch) throw new Error("Unable to login");
  return teacher;
};

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
