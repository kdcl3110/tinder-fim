const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error-handler");
const path = require("path");

const authRoute = require("./routes/auth.route");
const loadRoute = require("./routes/loaddatas.route");
const movieRoute = require("./routes/movie.route");


const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

app.use(
  session({
    secret: "amar",
    saveUninitialized: true,
    resave: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const dbUrl = "mongodb://mongo_flix_tinder:27017/tinder_film";

mongoose
  .connect(process.env.DB_URL || dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.end('Je suis la')
});

app.use("/auth", authRoute);
app.use("/load-datas", loadRoute);
app.use("/movies", movieRoute);

app.use(errorHandler);
module.exports = app;
