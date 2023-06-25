import React, { useState } from "react";
import { connect } from "react-redux";
import { Props } from "../../store/reducers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

type Event = React.FormEvent<HTMLFormElement>;

function AddPost(props: Props) {
  const { db_profile } = props.auth_reducer;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: Event) {
    event.preventDefault();
    const data = {
      title: title,
      body: body,
      user_id: db_profile?.uid,
    };

    axios
      .post("/api/posts", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .then(() => navigate("/"));

    return false;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          Submit
        </Button>
      </form>
      <br />
      <Button onClick={() => navigate("/")} variant="contained">
        Cancel
      </Button>
    </>
  );
}

export default connect((state: Props) => state)(AddPost);
