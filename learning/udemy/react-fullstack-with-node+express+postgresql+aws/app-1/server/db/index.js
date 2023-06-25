require("dotenv").config();
const { Pool } = require("pg");
const { Comment, Post, User } = require("./schema");

const pool = new Pool({
  user: String(process.env.pg_user),
  host: "localhost",
  database: "react_app",
  password: String(process.env.pg_password),
  port: 5432,
});

module.exports = { pool, Comment, Post, User };
