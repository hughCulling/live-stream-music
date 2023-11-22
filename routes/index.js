var express = require("express");
var router = express.Router();

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Live Stream Music" });
  if (req.session.user) {
    console.log("True.");
    console.log("req.session.user = " + req.session.user);
    console.log("req.session.user._id = " + req.session.user._id);
    // res.send(`<p>Logged in as: ${req.session.user.name}</p>`);
  } else {
    console.log("False");
  }
});

module.exports = router;
