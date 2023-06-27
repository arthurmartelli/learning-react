import { Card, CardHeader, CardContent } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { POST, DB_PROFILE } from "../../data";
import { get_user_from_db } from "../../data/db_users";
import { checkObjectProperties } from "../../utils/validateData";

export default function PostCard({ post }: { post: POST }) {
  const [author, setAuthor] = useState({} as DB_PROFILE);

  useEffect(() => {
    if (!checkObjectProperties(post)) return;
    get_user_from_db(post.user_id || "").then((res) => {
      setAuthor(res);
    });
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Link to={`/posts/${post.pid}`} state={post}>
            {post.title}
          </Link>
        }
        subheader={`By: ${author.username}`}
      ></CardHeader>
      <CardContent>
        <span style={{ overflow: "hidden" }}>{post.body}</span>
      </CardContent>
    </Card>
  );
}
