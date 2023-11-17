var express = require("express");
var router = express.Router();

/* GET playback page. */
router.get("/", function (req, res, next) {
  res.render("playback", { title: "Playback | Live Stream Music" });
});

module.exports = router;
