const express = require("express");
const router = express.Router();
const { pool } = require("../../db");

router.get("", (req, res, next) => {
  const values = [req.query.post_id];

  pool.query(
    `SELECT * FROM comments WHERE post_id = $1`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.post("", (req, res, next) => {
  const values = [req.body.body, req.body.user_id, req.body.post_id];

  pool.query(
    `INSERT INTO comments (body, user_id, post_id, created_at)
      VALUES ( $1, $2, $3, NOW() )`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.put("", (req, res, next) => {
  const values = [
    req.body.body,
    req.body.user_id,
    req.body.post_id,
    req.body.cid,
  ];

  pool.query(
    `UPDATE comments
      SET body = $1, user_id = $2, post_id = $3, created_at = NOW()
      WHERE cid = $4`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.delete("", (req, res, next) => {
  const values = [req.query.cid];

  pool.query(
    `DELETE FROM comments
    WHERE cid = $1`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

router.delete("/post-comments", (req, res, next) => {
  const values = [req.query.post_id];

  pool.query(
    `DELETE FROM comments
    WHERE post_id = $1`,
    values,
    (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    }
  );
});

module.exports = router;
