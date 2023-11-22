var express = require("express");
var router = express.Router();

/* GET user page. */
router.get("/", function (req, res, next) {
  res.render("user", { title: "Live Stream Music", href: "/broadcast" });
});

module.exports = router;
