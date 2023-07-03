const express = require("express");
const router = express.Router();
const { pool } = require("../../db");

router.get("", (req, res, next) => {
  const email = req.query.email;
  const values = [email];

  pool.query("SELECT * FROM users WHERE email = $1", values, (err, result) => {
    if (err) return next(err);
    res.json(result.rows);
  });
});

router.post("", (req, res, next) => {
  const values = [req.body.username, req.body.email, req.body.email_verified];
  pool.query(
    `INSERT INTO users (username, email, email_verified, created_at, last_login)
    VALUES ( $1, $2, $3, NOW(), NOW() )
    ON CONFLICT DO NOTHING`,
    values,
    (err, result) => {
      if (err) return next(err);
      console.log(`CREATING USER: ${req.body.email}`);
      res.json(result.rows);
    }
  );
});

router.put("", (req, res, next) => {
  const values = [
    req.body.comment,
    req.body.user_id,
    req.body.post_id,
    req.body.username,
    re.body.cid,
  ];

  pool.query(
    `UPDATE comments
        SET comment  = $1, user_id = $2, post_id = $3, author = $4, created_at = NOW()
        WHERE cid = $5`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.get("/user_posts", (req, res, next) => {
  const values = [req.query.user_id];

  pool.query(
    `SELECT * FROM posts
    WHERE user_id = $1`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.get("/get_username", (req, res, next) => {
  const uid = req.query.uid;
  const values = [uid];

  pool.query("SELECT * FROM users WHERE uid = $1", values, (err, result) => {
    if (err) return next(err);
    res.json(result.rows);
  });
});

module.exports = router;
