import { useEffect, useState, FormEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Props } from "../../store/reducers";
import { COMMENT, DB_PROFILE, POST } from "../../store/actions/action_types";
import { get_user_from_db } from "../../utils/utils";
import { Button, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { ACTIONS } from "../../store/actions/actions";
import { useLocation, useNavigate } from "react-router-dom";
import RenderComment from "../RenderComment";

type ShowPostProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ShowPost = (props: ShowPostProps) => {
  const { state }: { state: POST } = useLocation();
  const post = state;
  const pid = post.pid;

  const navigate = useNavigate();
  const [user, setUser] = useState<DB_PROFILE | null>(null);

  useEffect(() => {
    axios
      .get("/api/comments", { params: { post_id: pid } })
      .then((res: AxiosResponse<COMMENT[]>) => {
        const uniqueComments: COMMENT[] = Array.from(
          new Set(res.data.map((comment) => comment.cid))
        )
          .map((cid) => {
            return res.data.find((comment) => comment.cid === cid)!;
          })
          .filter((comment) => comment !== undefined);

        props.update_comments(uniqueComments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    get_user_from_db(post.user_id || "")
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if needed
      });
  }, []);

  function handleSubmitNewComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      body: event.currentTarget.comment.value,
      user_id: props.user_id,
      post_id: pid,
    };

    axios
      .post("/api/comments", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .then(() => navigate("/posts"));
  }

  const uniqueComments = Array.from(
    new Set(props.comments.map((comment) => comment.cid))
  ).map((cid) => {
    return props.comments.find((comment) => comment.cid === cid);
  });

  return (
    <>
      {/* Post Section */}
      <h2>Post: {post.title}</h2>
      <h4>by: {user?.username}</h4>
      <p>{post.body}</p>

      {/* Comments Section */}
      <h2>Comments</h2>
      {uniqueComments.map((comment) => (
        <RenderComment
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
};

const mapStateToProps = (state: Props) => ({
  posts: state.post_reducer.posts,
  comments: state.post_reducer.comments,
  user_id: state.auth_reducer.db_profile?.uid || "",
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  update_comments: (comment: COMMENT[]) =>
    dispatch(ACTIONS.update_comments(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
