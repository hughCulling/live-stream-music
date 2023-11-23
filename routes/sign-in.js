const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const dbname = "live-stream-music";
const collection_name = "users";
const usersCollection = client.db(dbname).collection(collection_name);
let documentToFind = { email: "lornica@lsm.com" };

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

/* GET sign in page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("sign_in", {
      title: "Sign In | Live Stream Music",
      href: `${id}`,
      status: `Signed in as: ${req.session.user.name}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("sign_in", {
      title: "Sign In | Live Stream Music",
      href: "/sign-in",
      status: "User: not signed in",
    });
  }
});

/* POST sign in page. */
router.post("/", async function (req, res, next) {
  documentToFind = {
    email: `${req.body.email}`,
    password: `${req.body.password}`,
  };
  let result = await signInUser();
  req.session.user = result;
  req.session.save();

  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("sign_in", {
      title: "Sign In | Live Stream Music",
      href: `${id}`,
      status: `Signed in as: ${req.session.user.name}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("sign_in", {
      title: "Sign In | Live Stream Music",
      href: "/sign-in",
      status: "User: not signed in",
    });
  }
});

module.exports = router;
