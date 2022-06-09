import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import API_PATH from "../API_PATH";
import PasswordInput from "./../PasswordInput/PasswordInput";
import ConfirmPasswordInput from "./../ConfirmPasswordInput/ConfirmPasswordInput";
import SubmitButton from "./../SubmitButton/SubmitButton";
import { UserContext } from "./../UserProvider";

export default function ResetPassword({ role, user_id }) {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [resetPasswordError, setResetPasswordError] = useState();
  const [success, setSuccess] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const resetPassword = async (e) => {
    e.preventDefault();
    setResetPasswordError("");
    setSuccess("");
    let form = new FormData();
    form.append("password", password);

    const res = await fetch(
      `${API_PATH}/${role}/resetpassword/${user_id ? user_id : id}`,
      {
        method: "PUT",
        body: form,
        headers: {
          Authorization: token,
        },
      }
    );

    if (res.ok) {
      setSuccess("نم تعديل كلمة المرور بنجاح.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setResetPasswordError("فشل في تعديل كلمة المرور");
    }
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        <LockResetIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="shadow-lg mt-4 p-5 rounded Login mx-auto"
            onSubmit={resetPassword}
          >
            <h4 className="text-center text-muted my-3">تعديل كلمة المرور</h4>
            <PasswordInput password={password} setPassword={setPassword} />
            <ConfirmPasswordInput
              password={password}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
            {resetPasswordError && (
              <p className="text-danger">{resetPasswordError}</p>
            )}
            {success && <p className="text-success">{success}</p>}
            <SubmitButton submitLabel="تأكيد" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
