-- psql -d react_app -f .\server\db\schema.sql
CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);

CREATE TABLE posts (
    pid SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body VARCHAR NOT NULL,
    user_id INT REFERENCES users(uid) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE comments (
    cid SERIAL PRIMARY KEY,
    body VARCHAR NOT NULL,
    user_id INT REFERENCES users(uid) NOT NULL,
    post_id INT REFERENCES posts(pid) NOT NULL,
    created_at TIMESTAMP NOT NULL
);