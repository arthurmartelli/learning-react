import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { POST } from "../../data";
import { delete_post } from "../../data/posts";

function PostCard({ post }: { post: POST }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  async function handleDeletePost() {
    if (!post.pid) return;
    delete_post(post.pid);
    setOpenDeleteDialog(false);
    navigate("/profile");
  }

  return (
    <>
      <Card style={{ width: "100vw" }}>
        <CardHeader
          title={
            <Link to={`/posts/edit/${post.pid}`} state={post}>
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
}

export default PostCard;
