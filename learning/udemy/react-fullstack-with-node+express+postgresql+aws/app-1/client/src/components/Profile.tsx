import { useAuth0 } from "@auth0/auth0-react";
import { Dispatch } from "@reduxjs/toolkit";
import { ACTIONS } from "../store/actions/actions";
import { DB_PROFILE, POST, PROFILE } from "../store/actions/action_types";
import { Props } from "../store/reducers";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

type ProfileProps = ReturnType<typeof mapStateToProps>;
type ProfileDispatchProps = ReturnType<typeof mapDispatchToProps>;

const RenderPost = ({ post }: { post: POST }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await axios.delete("api/comments/post-comments", {
      params: {
        post_id: post.pid,
      },
    });

    await axios.delete("api/posts", {
      params: {
        pid: post.pid,
      },
    });

    navigate("/");
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <CardHeader
          title={
            <Link to={{ pathname: `/posts/edit/${post.pid}` }} state={post}>
              {post.title}
            </Link>
          }
          subheader={
            <div className="flexColumn">
              <div className="flexRow">{post.created_at}</div>
              <div className="flexRow">
                <Button>Edit</Button>
                <Button onClick={() => setOpenDeleteDialog(true)}>
                  Delete
                </Button>
              </div>
            </div>
          }
        ></CardHeader>
        <CardContent>
          <span style={{ overflow: "hidden" }}>{post.body}</span>
        </CardContent>
      </Card>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Profile = (props: ProfileProps & ProfileDispatchProps) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { db_profile, posts } = props;

  useEffect(() => {
    props.set_posts([]);

    if (db_profile && db_profile.uid !== null) {
      axios
        .get("api/users/user_posts", {
          params: {
            user_id: db_profile.uid,
          },
        })
        .then((posts: AxiosResponse<POST[]>) => {
          props.set_posts(posts.data);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </div>
      )}
      {posts.map((post: POST) => (
        <RenderPost post={post} key={post.pid} />
      ))}
    </>
  );
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (p: PROFILE) => dispatch(ACTIONS.add_profile(p)),
    remove_profile: () => dispatch(ACTIONS.remove_profile()),
    set_db_profile: (p: DB_PROFILE) => dispatch(ACTIONS.set_db_profile(p)),
    set_posts: (p: POST[]) => dispatch(ACTIONS.set_posts(p)),
  };
}

function mapStateToProps(state: Props) {
  return {
    db_profile: state.auth_reducer.db_profile,
    posts: state.post_reducer.posts,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
