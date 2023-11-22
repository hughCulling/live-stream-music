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
    return result;
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
  if (req.session.user) {
    console.log("True.");
    console.log("req.session.user = " + req.session.user);
    // res.send(`<p>Logged in as: ${req.session.user.name}</p>`);
  } else {
    console.log("False");
  }
});

/* POST sign in page. */
router.post("/", async function (req, res, next) {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  documentToFind = {
    email: `${userEmail}`,
    password: `${userPassword}`,
  };

  let result = await signInUser();
  console.log(result);

  req.session.user = result;
  console.log(req.session.user);
  req.session.save();

  res.render("sign_in", { title: "Sign In | Live Stream Music" });
});

module.exports = router;
