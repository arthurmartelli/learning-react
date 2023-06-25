import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACTIONS } from "../../store/actions/actions";
import { COMMENT, POST } from "../../store/actions/action_types";
import { Props } from "../../store/reducers";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import axios from "axios";

type EditPostsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function EditPost(props: EditPostsProps) {
  const { state }: { state: POST } = useLocation();
  const navigate = useNavigate();
  const post = state;

  const [title, setTitle] = useState(post ? post.title : "");
  const [body, setBody] = useState(post ? post.body : "");

  const editable = post ? post.user_id === props.db_profile?.uid : false;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      body,
      user_id: props.db_profile?.uid,
      pid: post.pid,
    };

    await axios.put("/api/posts", data);
    navigate(`/profile`);
  };

  return (
    <>
      {editable && (
        <>
          <form
            onSubmit={async (e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              id="title"
              label="Title"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <TextField
              id="body"
              label="Body"
              margin="normal"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
          <br />

          <Button onClick={() => navigate("/profile")} variant="contained">
            Cancel
          </Button>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state: Props) => ({
  posts: state.post_reducer.posts,
  comments: state.post_reducer.comments,
  db_profile: state.auth_reducer.db_profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  update_comments: (comment: COMMENT[]) =>
    dispatch(ACTIONS.update_comments(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
