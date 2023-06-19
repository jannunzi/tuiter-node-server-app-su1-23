// const express = require("express");
import UsersController from "./users/users-controller.js";
import AuthenticationController from "./users/auth-controller.js";
import TuitsController from "./tuits/tuits-controller.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://jannunzi:M3z9JRSvzhbUdSiu@cluster0.erbnm4p.mongodb.net/tuiter-su1-23?retryWrites=true&w=majority"
);
// mongoose.connect("mongodb://127.0.0.1:27017/tuiter-su1-23");

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: "https://a6--resonant-quokka-5a61c8.netlify.app",
    // origin: "http://localhost:3000",
  })
);
app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World how are you! I'm awesome");
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}`);
});

UsersController(app);
AuthenticationController(app);
TuitsController(app);

const port = process.env.PORT || 4000;
app.listen(4000);
