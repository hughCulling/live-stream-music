const express = require("express");
const router = express.Router();

/* GET broadcast page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("broadcast", {
      title: "Broadcast | Live Stream Music",
      href: `${id}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("broadcast", {
      title: "Broadcast | Live Stream Music",
      href: "/sign-in",
    });
  }
});

module.exports = router;
