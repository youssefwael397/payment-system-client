import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function DeleteUser({ role, user_id, user_name }) {
  const { token } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null);
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  const handleDelete = async () => {
    const url = `${API_PATH}/${role}`;

    const res = await fetch(url, {
      method: "Delete",
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data);
    } else {
      setError(`فشل في حذف ${user_name}`);
    }
  };

  return (
    <div>
      <Button size="small" color="error" onClick={handleOpen}>
        <DeleteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            حذف {user_name}
          </Typography>
          <Typography id="modal-modal-description" className="fs-5 my-3">
            هل انت متأكد؟
          </Typography>
          <Button
            className="mx-2"
            variant="outlined"
            size="small"
            onClick={() => handleClose()}
          >
            لا
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(user_id)}
          >
            نعم حذف
          </Button>
          {success ? (
            <Alert severity="success" color="info">
              {success}
            </Alert>
          ) : null}
          {error ? (
            <Alert severity="error" color="info">
              {error}
            </Alert>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUser;
