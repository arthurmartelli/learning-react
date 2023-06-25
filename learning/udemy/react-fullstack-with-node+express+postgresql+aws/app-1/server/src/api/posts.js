const express = require("express");
const router = express.Router();
const { pool } = require("../../db");

router.get("", (req, res, next) => {
  console.log("RETURNING ALL POSTS");
  pool.query("SELECT * FROM posts ORDER BY created_at DESC", (err, result) => {
    res.json(result.rows);
  });
});

router.post("", (req, res, next) => {
  console.log(`CREATING POST: ${req.body.title}`);
  const values = [req.body.title, req.body.body, req.body.user_id];

  pool.query(
    `INSERT INTO posts (title, body, user_id, created_at)
    VALUES ( $1, $2, $3, NOW() )`,
    values,
    (err, result) => {
      if (err) {
        // console.log(err);
        return next(err);
      }
      res.json(result.rows);
    }
  );
  console.log(`CREATED POST: ${req.body.title}`);
});

router.put("", (req, res, next) => {
  const values = [
    req.body.title,
    req.body.body,
    req.body.user_id,
    req.body.pid,
  ];

  pool.query(
    `UPDATE posts
    SET title = $1, body = $2, user_id = $3, created_at=NOW()
    WHERE pid = $4`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(result.rows);
    }
  );
});

router.delete("", (req, res, next) => {
  const values = [req.query.pid];
  pool.query(
    `DELETE FROM posts
    WHERE pid = $1`,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(result.rows);
    }
  );
});

module.exports = router;
