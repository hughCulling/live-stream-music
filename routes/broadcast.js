var express = require("express");
var router = express.Router();

/* GET broadcast page. */
router.get("/", function (req, res, next) {
  res.render("broadcast", { title: "Live Stream Music" });
});

module.exports = router;
