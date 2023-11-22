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

let documentToFind = { email: "lornica@lsm.com" };

const signInUser = async () => {
  try {
    await connectToDatabase();
    let result = await usersCollection.findOne(documentToFind);
    console.log(`Found one document`);
    console.log(result);
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

//----------------------------------------------------------------------------------

/* GET sign in page. */
router.get("/", function (req, res, next) {
  res.render("sign_in", { title: "Sign In | Live Stream Music" });
});

/* POST sign in page. */
router.post("/", function (req, res, next) {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  documentToFind = {
    email: `${userEmail}`,
    password: `${userPassword}`,
  };

  signInUser();

  res.render("sign_in", { title: "Sign In | Live Stream Music" });
});

module.exports = router;
