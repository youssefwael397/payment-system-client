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

 

  const handleDelete = async (e) => {
    e.preventDefault();
    const url = `${API_PATH}/${role}/${user_id}`;

    const res = await fetch(url, {
      method: "Delete",
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (res.ok) {
      window.location.reload();
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
          <form sx={style} onSubmit={(e) => handleDelete(e)}>
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
              type="submit"
            >
              نعم حذف
            </Button>
            {success ? (
              <Alert className="mt-2" severity="success" color="info">
                {success}
              </Alert>
            ) : null}
            {error ? (
              <Alert className="mt-2" severity="error" color="error">
                {"  " + error}
              </Alert>
            ) : null}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteUser;
