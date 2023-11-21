var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// //-------------------------------------------------------------
// // MongoDB
// // Require MongoDB language driver
// const { MongoClient } = require("mongodb");
// const uri = require("./atlas_uri");

// const client = new MongoClient(uri);
// const dbname = "live-stream-music";
// const collection_name = "users";

// const usersCollection = client.db(dbname).collection(collection_name);

// // Connect to the database
// const connectToDatabase = async () => {
//   try {
//     await client.connect();
//     console.log(
//       `Connected to the ${dbname} database 🌍 \nFull connection string: ${uri}`
//     );
//   } catch (err) {
//     console.error(`Error connecting to the database: ${err}`);
//   }
// };

// const sampleUser = {
//   name: "Pholorphria",
//   email: "hughculling@gmail.com",
//   password: "pw123",
// };

// const main = async () => {
//   try {
//     await connectToDatabase();
//     let result = await usersCollection.insertOne(sampleUser);
//     console.log(`Inserted document: ${result.insertedId}`);
//   } catch (err) {
//     console.error(`Error connecting to the database: ${err}`);
//   } finally {
//     await client.close();
//   }
// };
// // Run the main function
// main();

// //----------------------------------------------------------------

var indexRouter = require("./routes/index");
var broadcastRouter = require("./routes/broadcast");
var playbackRouter = require("./routes/playback");
var signUpRouter = require("./routes/sign-up");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/broadcast", broadcastRouter);
app.use("/playback", playbackRouter);
app.use("/sign-up", signUpRouter);

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
