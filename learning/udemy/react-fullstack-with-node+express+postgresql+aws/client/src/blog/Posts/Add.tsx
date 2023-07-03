import { FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Props } from "../../store/reducers";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { add_post } from "../../data/posts";
import { checkObjectProperties } from "../../utils/validateData";

function AddPost(props: Props) {
  const { db_profile } = props.auth_reducer;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      title: title || "",
      body: body || "",
      user_id: db_profile?.uid || "",
    };
    if (!checkObjectProperties(data)) return;
    await add_post(data);
    navigate("/profile");
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
      <Button onClick={() => navigate("/posts")} variant="contained">
        Cancel
      </Button>
    </>
  );
}

export default connect((state: Props) => state)(AddPost);
