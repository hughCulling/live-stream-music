const express = require("express");
const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const router = express.Router();
const client = new MongoClient(uri);
const dbname = "live-stream-music";
const collection_name = "users";
const usersCollection = client.db(dbname).collection(collection_name);
let userAccount = {};

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

/* GET sign up page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("sign_up", {
      title: "Sign Up | Live Stream Music",
      href: `${id}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("sign_up", {
      title: "Sign Up | Live Stream Music",
      href: "/sign-in",
    });
  }
});

/* POST sign up page. */
router.post("/", function (req, res, next) {
  userAccount = {
    name: `${req.body.name}`,
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  };

  signUpUser();

  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("sign_up", {
      title: "Sign Up | Live Stream Music",
      href: `${id}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("sign_up", {
      title: "Sign Up | Live Stream Music",
      href: "/sign-in",
    });
  }
});

module.exports = router;
