import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { COMMENT, DB_PROFILE } from "../../data";
import { get_user_from_db } from "../../data/db_users";
import { useNavigate } from "react-router-dom";
import { delete_comment, edit_comment } from "../../data/comments";
import { checkObjectProperties } from "../../utils/validateData";

type RenderCommentProps = {
  comment: COMMENT;
  user_id: string;
};

function Show({ comment, user_id }: RenderCommentProps) {
  const [user, setUser] = useState<DB_PROFILE>({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const navigate = useNavigate();

  useEffect(() => {
    if (comment.user_id === undefined) return;

    get_user_from_db(comment.user_id)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [comment.user_id]);

  const handleEditComment = async () => {
    const data = {
      body: editedComment || "",
      user_id: comment.user_id || "",
      post_id: comment.post_id || "",
      cid: comment.cid || "",
    };

    if (!checkObjectProperties(data)) return;

    await edit_comment(data);
    setOpenEditDialog(false);
  };

  const handleDeleteComment = async () => {
    setOpenDeleteDialog(false);
    if (comment.cid === "" || comment.cid === undefined) return;
    await delete_comment(comment.cid);
    navigate("/posts");
  };

  const handleCloseEditDialog = () => {
    setEditedComment(comment.body);
    setOpenEditDialog(false);
  };

  return (
    <Card key={comment.cid} variant="outlined">
      <CardContent>
        {user ? (
          <>
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="subtitle2">{comment.created_at}</Typography>
            <Typography variant="body1">By: {user.username}</Typography>
            {comment.user_id === user_id ? (
              <>
                <Button onClick={() => setOpenEditDialog(true)}>Edit</Button>
                <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                  <DialogTitle>Edit Comment</DialogTitle>
                  <DialogContent>
                    <TextField
                      multiline
                      fullWidth
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditComment}>Update</Button>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                  </DialogActions>
                </Dialog>

                <Button onClick={() => setOpenDeleteDialog(true)}>
                  Delete
                </Button>
                <Dialog
                  open={openDeleteDialog}
                  onClose={() => setOpenDeleteDialog(false)}
                >
                  <DialogTitle>Delete Comment</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleDeleteComment}>Delete</Button>
                    <Button onClick={() => setOpenDeleteDialog(false)}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
            <Typography variant="body2">{comment.body}</Typography>
          </>
        ) : (
          <Typography variant="body2">Loading user data...</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default Show;
