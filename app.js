const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");
const broadcastRouter = require("./routes/broadcast");
const playbackRouter = require("./routes/playback");
const signUpRouter = require("./routes/sign-up");
const signInRouter = require("./routes/sign-in");
const userRouter = require("./routes/user");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: { secure: false },
  })
);

app.use("/", indexRouter);
app.use("/broadcast", broadcastRouter);
app.use("/playback", playbackRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/:id", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
