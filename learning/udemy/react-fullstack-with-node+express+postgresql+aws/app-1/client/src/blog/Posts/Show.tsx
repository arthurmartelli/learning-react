import { useEffect, useState, FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Props } from "../../store/reducers";
import { COMMENT, DB_PROFILE, POST } from "../../data";
import { get_user_from_db } from "../../data/db_users";
import { Button, TextField } from "@mui/material";
import { ACTIONS } from "../../store/actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { ShowComments } from "../Comments";
import {
  get_post_comments,
  get_unique_comments,
  post_comment,
} from "../../data/comments";
import { checkObjectProperties } from "../../utils/validateData";

type ShowPostProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

function Show(props: ShowPostProps) {
  const { state }: { state: POST } = useLocation();
  const post = state;
  const pid = post.pid || "";

  const navigate = useNavigate();
  const [comments, setComments] = useState([] as COMMENT[]);
  const [user, setUser] = useState<DB_PROFILE | null>(null);

  useEffect(() => {
    get_post_comments(pid).then((res) => {
      setComments(get_unique_comments(res.data));
    });
  }, []);

  useEffect(() => {
    get_user_from_db(post.user_id || "")
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, []);

  function handleSubmitNewComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      body: event.currentTarget.comment.value || "",
      user_id: props.user_id || "",
      post_id: pid || "",
    };

    if (!checkObjectProperties(data)) return;
    post_comment(data);
    navigate("/posts");
  }

  return (
    <>
      {/* Post Section */}
      <h2>Post: {post.title}</h2>
      <h4>by: {user?.username}</h4>
      <p>{post.body}</p>

      {/* Comments Section */}
      <h2>Comments</h2>
      {comments.map((comment) => (
        <ShowComments
          key={comment?.cid}
          comment={comment || {}}
          user_id={props.user_id || ""}
        />
      ))}

      {/* Create Comment Section */}
      <form onSubmit={handleSubmitNewComment}>
        <TextField id="comment" label="comment" margin="normal" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

const mapStateToProps = (state: Props) => ({
  posts: state.post_reducer.posts,
  comments: state.post_reducer.comments,
  user_id: state.auth_reducer.db_profile?.uid || "",
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  update_comments: (comment: COMMENT[]) =>
    dispatch(ACTIONS.update_comments(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);
