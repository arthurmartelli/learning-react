class User {
  uid;
  username;
  email;
  email_verified;
  created_at;
  last_login;
}

class Post {
  pid;
  title;
  body;
  user_id;
  created_at;
}

class Comment {
  cid;
  body;
  user_id;
  post_id;
  created_at;
}

module.exports = { User, Post, Comment };
