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
import { COMMENT, DB_PROFILE } from "../store/actions/action_types";
import { get_user_from_db } from "../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RenderCommentProps = {
  comment: COMMENT;
  user_id: string;
};

const RenderComment: React.FC<RenderCommentProps> = ({ comment, user_id }) => {
  const [user, setUser] = useState<DB_PROFILE | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const navigate = useNavigate();

  const handleEditComment = () => {
    const data = {
      body: editedComment,
      user_id: comment.user_id,
      post_id: comment.post_id,
      cid: comment.cid,
    };

    axios.put("/api/comments", data).then((res) => {});

    // Close the dialog after updating the comment
    setOpenEditDialog(false);
  };

  const handleDeleteComment = () => {
    // Perform the API request to update the comment
    axios
      .delete("/api/comments", {
        params: {
          cid: comment.cid,
        },
      })
      .then((res) => navigate("/posts"));

    // Close the dialog after updating the comment
    setOpenDeleteDialog(false);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditedComment(comment.body);
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Fetch user information
  useEffect(() => {
    get_user_from_db(comment.user_id || "")
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if needed
      });
  }, [comment.user_id]);

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
                <Button onClick={handleOpenEditDialog}>Edit</Button>
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

                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleCloseDeleteDialog}
                >
                  <DialogTitle>Delete Comment</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleDeleteComment}>Delete</Button>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
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
};

export default RenderComment;
