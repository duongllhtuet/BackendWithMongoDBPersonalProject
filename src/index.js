const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port = 3000;

const routes = require("./routes/index.Routes");
const db = require("./config/db/index");

// Connect to db
db.connect();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Apply middleware to handle body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use method override to support HTTP verbs like PUT and DELETE
app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("combined"));

// Template engine setup
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Define routes
routes(app);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
