const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes");

const server = express();
server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());

server.use("/", indexRouter);
server.get("/hello", (req, res) => res.json("Hello World"));

module.exports = server;
