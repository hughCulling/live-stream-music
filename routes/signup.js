var express = require("express");
var router = express.Router();

/* GET index page. */
router.get("/", function (req, res, next) {
  res.render("signup", { title: "Sign Up | Live Stream Music" });
});

module.exports = router;
