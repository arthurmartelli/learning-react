import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { edit_comment, delete_comment, COMMENT } from "../../data/comments";
import { checkObjectProperties } from "../../utils/validateData";
import { redirect } from "react-router-dom";

function EditableComment({ comment }: { comment: COMMENT }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);

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
    if (!comment.cid) return;
    await delete_comment(comment.cid);
    redirect("/posts");
  };

  const handleCloseEditDialog = () => {
    setEditedComment(comment.body);
    setOpenEditDialog(false);
  };
  return (
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

      <Button onClick={() => setOpenDeleteDialog(true)}>Delete</Button>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteComment}>Delete</Button>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditableComment;
