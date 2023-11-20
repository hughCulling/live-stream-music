var express = require("express");
var router = express.Router();

/* GET sign up page. */
router.get("/", function (req, res, next) {
  res.render("sign_up", { title: "Sign Up | Live Stream Music" });
});

module.exports = router;
