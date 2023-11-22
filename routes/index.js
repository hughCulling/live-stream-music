var express = require("express");
var router = express.Router();

/* GET index page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    console.log("True.");
    console.log("req.session.user = " + req.session.user);
    console.log("req.session.user._id = " + req.session.user._id);
    let id = "/" + req.session.user._id;
    console.log("the id is:" + id);
    res.render("index", {
      title: "Live Stream Music",
      href: `${id}`,
    });
    // res.send(`<p>Logged in as: ${req.session.user.name}</p>`);
  } else {
    console.log("False");
    res.render("index", { title: "Live Stream Music", href: "/sign-in" });
  }
  // res.render("index", { title: "Live Stream Music", href: "/broadcast" });
});

module.exports = router;
