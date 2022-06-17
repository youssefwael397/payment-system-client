import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import API_PATH from "../API_PATH";
import { UserContext } from "../UserProvider";
import Alert from "@mui/material/Alert";
import NameInput from "../NameInput/NameInput";
import EmailInput from "../EmailInput/EmailInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import PhoneInput from "../PhoneInput/PhoneInput";
import NationalIdInput from "../NationalIdInput/NationalIdInput";
import FacebookLinkInput from "../FacebookLinkInput/FacebookLinkInput";

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

function EditClient({ userInfo }) {
  const { token } = useContext(UserContext);
  const [name, setName] = useState();
  const [nationalId, setNationalId] = useState();
  const [phone, setPhone] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (userInfo) {
      setPhone(userInfo.phone);
      setName(userInfo.client_name);
      setNationalId(userInfo.national_id);
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    const url = `${API_PATH}/client/update/${userInfo.client_id}`;

    let form = new FormData();
    form.append("client_name", name);
    form.append("national_id", nationalId);
    form.append("phone", phone);

    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });

    // const data = await res.json();
    setIsLoading(false);
    if (res.ok) {
      setSuccess(`تم تعديل البيانات بنجاح`);

    } else {
      setErr(`فشل في تعديل بيانات ${userInfo.client_name}`);
    }
  };

  if (userInfo) {
    return (
      <div>
        <Button size="small" color="primary" onClick={handleOpen}>
          <EditIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form sx={style} onSubmit={(e) => handleUpdate(e)}>
              <NameInput
                name={name}
                setName={setName}
                label="الاسم"
                placeholder={"يوسف وائل السيد"}
              />
              <PhoneInput phone={phone} setPhone={setPhone} />
              <NationalIdInput
                nationalId={nationalId}
                setNationalId={setNationalId}
              />
              <SubmitButton submitLabel="تعديل" />
              {success && <p className="text-center text-success">{success}</p>}
              {err && <p className="text-center text-danger">{err}</p>}
              {isLoading && <LoadingSpinner />}
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default EditClient;
