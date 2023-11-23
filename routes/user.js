var express = require("express");
var router = express.Router();

/* GET user page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("user", {
      title: "User | Live Stream Music",
      href: `${id}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("user", {
      title: "User | Live Stream Music",
      href: "/sign-in",
    });
  }
});

module.exports = router;
