const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/users");
//-------------------Config----------------//
dotenv.config({ path: "./config.env" });
//--------------------DB-------------------//
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("DB connection successful!"));
//------------------Read_File----------------//
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
//--------------------CRUD------------------//
// Import data into DB
async function importData() {
  try {
    await User.create(users);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// Delete all data from DB
async function deleteData() {
  try {
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// process.argv to check passed arguments
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
