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

function EditNationalImages({ user_id, role }) {
  const { token } = useContext(UserContext);
  const [faceImg, setFaceImg] = useState();
  const [backImg, setBackImg] = useState();
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

    const url = `${API_PATH}/${role}/update/national-images/${user_id}`;

    let form = new FormData();
    form.append(`${role}_img`, faceImg);
    form.append(`${role}_img`, backImg);

    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });
    setIsLoading(false)
    if (res.ok) {
      window.location.reload();
    }else{
      setErr(`فشل قي تعديل صور البطاقة`)
    }
  };

  if (user_id) {
    return (
      <form sx={style} onSubmit={(e) => handleUpdate(e)}>
        <div className="d-flex justify-content-center align-items-center">

          <AddImage
            image={faceImg}
            setImage={setFaceImg}
            inputLabel="صورة وجه البطاقة"
          />
          <AddImage
            image={backImg}
            setImage={setBackImg}
            inputLabel="صورة ظهر البطاقة"
          />
        </div>
        <div className="text-center">
          <SubmitButton submitLabel="تعديل" />
        </div>
        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading ? <div className="text-center"><LoadingSpinner /></div> : null}
      </form>
    );
  }
}

export default EditNationalImages;
