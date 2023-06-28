import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { POST } from "../../data";
import { Props } from "../../store/reducers";
import { connect } from "react-redux";
import { TextField, Button } from "@mui/material";
import { edit_post } from "../../data/posts";
import { checkObjectProperties } from "../../utils/validateData";

type EditPostsProps = ReturnType<typeof mapStateToProps>;

function EditPost(props: EditPostsProps) {
  const { state }: { state: POST } = useLocation();
  const navigate = useNavigate();
  const post = state;
  const editable = post ? post.user_id === props.db_profile?.uid : false;

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      title: title || "",
      body: body || "",
      user_id: props.db_profile?.uid || "",
      pid: post.pid || "",
    };

    if (!checkObjectProperties(data)) return;

    await edit_post(data);
    navigate(`/posts/${post.pid}`);
  }

  return editable ? (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
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
  ) : (
    <>You are unauthorized to edit this post</>
  );
}

const mapStateToProps = (state: Props) => ({
  posts: state.post_reducer.posts,
  comments: state.post_reducer.comments,
  db_profile: state.auth_reducer.db_profile,
});

export default connect(mapStateToProps)(EditPost);
