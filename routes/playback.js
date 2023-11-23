const express = require("express");
const router = express.Router();

/* GET playback page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("They are signed in.");
    let id = "/" + req.session.user._id;
    res.render("playback", {
      title: "Playback | Live Stream Music",
      href: `${id}`,
    });
  } else {
    console.log("They are not signed in.");
    res.render("playback", {
      title: "Playback | Live Stream Music",
      href: "/sign-in",
    });
  }
});

module.exports = router;
