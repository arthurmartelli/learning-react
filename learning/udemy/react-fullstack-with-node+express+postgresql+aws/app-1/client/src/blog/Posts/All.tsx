import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { POST } from "../../data";
import { get_posts, get_unique_posts } from "../../data/posts";
import Card from "./Card";

function Posts() {
  const [posts, setPosts] = useState([] as POST[]);

  useEffect(() => {
    get_posts().then((res) => {
      setPosts(get_unique_posts(res.data));
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Post</h1>

        <Link to="/posts/new" style={{ alignSelf: "center" }}>
          <Button variant="contained" color="primary">
            New Post
          </Button>
        </Link>
      </div>

      {posts.map((post) => (
        <Card post={post} key={post.pid} />
      ))}
    </>
  );
}

export default Posts;
