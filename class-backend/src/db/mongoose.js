const mongoose = require("mongoose");
//insert mongo credentials
const username = "";
const password = "";
const cluster = "";
const dbname = "class-db";
mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database connected");
  }
);
