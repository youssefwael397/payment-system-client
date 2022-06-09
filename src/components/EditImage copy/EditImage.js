import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import AddImage from "./../AddImage/AddImage";

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

function EditImage({ user_id, role }) {
  const { token } = useContext(UserContext);
  const [img, setImg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    const url = `${API_PATH}/${role}/update/image/${user_id}`;

    let form = new FormData();
    form.append(`${role}_img`, img);

    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });
    window.location.reload();
  };

  if (user_id) {
    return (
      <div className="position-absolute bottom-0 start-0 m-2">
        <Button size="small" color="primary" onClick={handleOpen}>
          <i class="fa-solid fa-pen-to-square text-white fs-5"></i>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form sx={style} onSubmit={(e) => handleUpdate(e)}>
              <AddImage
                image={img}
                setImage={setImg}
                inputLabel="صورة المدير"
              />
              <SubmitButton submitLabel="تعديل" />
              {success && <p className="text-center text-success">{success}</p>}
              {err && <p className="text-center text-danger">{err}</p>}
              {isLoading ? <LoadingSpinner /> : null}
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default EditImage;
