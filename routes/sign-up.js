var express = require("express");
var router = express.Router();

//--------------------------------------------------------------------------------
// MongoDB
// Require MongoDB language driver
const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const dbname = "live-stream-music";
const collection_name = "users";

const usersCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(
      `Connected to the ${dbname} database 🌍 \nFull connection string: ${uri}`
    );
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

let userAccount = {
  name: "Phlorpia",
  email: "hughculling@gmail.com",
  password: "pw123",
};

const signUpUser = async () => {
  try {
    await connectToDatabase();
    let result = await usersCollection.insertOne(userAccount);
    console.log(`Inserted document: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

//----------------------------------------------------------------------------------

/* GET sign up page. */
router.get("/", function (req, res, next) {
  res.render("sign_up", { title: "Sign Up | Live Stream Music" });
});

/* POST sign up page. */
router.post("/", function (req, res, next) {
  let userName = req.body.name;
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  userAccount = {
    name: `${userName}`,
    email: `${userEmail}`,
    password: `${userPassword}`,
  };

  signUpUser();

  res.render("sign_up", { title: "Sign Up | Live Stream Music" });
});

module.exports = router;
