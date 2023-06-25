import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Props } from "../../store/reducers";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ACTIONS } from "../../store/actions/actions";
import "./All.css";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { DB_PROFILE, POST } from "../../store/actions/action_types";
import { Dispatch } from "@reduxjs/toolkit";
import { get_user_from_db } from "../../utils/utils";

const RenderPost = ({ post }: { post: POST }) => {
  const [dbUser, setDbUser]: [DB_PROFILE, Function] = useState({});

  useEffect(() => {
    get_user_from_db(post.user_id || "").then((res: DB_PROFILE) =>
      setDbUser(res)
    );
  }, []);

  return (
    <Card>
      <CardHeader
        title={
          <Link to={`/posts/${post.pid}`} state={post}>
            {post.title}
          </Link>
        }
        subheader={`By: ${dbUser.username}`}
      ></CardHeader>
      <CardContent>
        <span style={{ overflow: "hidden" }}>{post.body}</span>
      </CardContent>
    </Card>
  );
};

type PostsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Posts = (props: PostsProps) => {
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res: AxiosResponse<POST[]>) =>
        res.data.map((post) => props.set_post(post))
      );
  }, []);
  const { posts } = props;
  const uniqueKeys: Record<string, boolean> = {};

  const posts_display = posts
    .filter((post) => {
      const pid = post.pid;
      if (pid && !uniqueKeys[pid]) {
        uniqueKeys[pid] = true;
        return true;
      }
      return false;
    })
    .map((post) => {
      return (
        <div className="postCard">
          <RenderPost post={post} key={post.pid} />
        </div>
      );
    });

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
      {posts_display}
    </>
  );
};

const mapStateToProps = (state: Props) => {
  return {
    posts: state.post_reducer.posts,
  };
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    set_post: (post: POST) => dispatch(ACTIONS.fetch_db_post(post)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
