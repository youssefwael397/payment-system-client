import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import { TextField } from "@mui/material";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";

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

function EditCategory({ categoryInfo }) {
  const { token } = useContext(UserContext);
  const [categoryName, setCategoryName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (categoryInfo) {
        setCategoryName(categoryInfo.category_name)
    }
  }, [categoryInfo]);

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

    const url = `${API_PATH}/category/update/${categoryInfo.category_id}`;

    let form = new FormData();
    form.append("category_name", categoryName);

    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });

    const data = await res.json();
    setIsLoading(false);
    if (res.ok) {
      setSuccess(`تم تعديل التصنيف بنجاح`);

    } else {
      setErr(`فشل في تعديل بيانات ${categoryInfo.sales_name}`);
    }
  };

  if (categoryInfo) {
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
                name={categoryName}
                setName={setCategoryName}
                label="اسم التصنيف"
                placeholder={"موبايل"}
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

export default EditCategory;


const NameInput = ({ name, setName, label, placeholder }) => {
  let validName = true;
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validName && "text-danger"
      }`}
    >
      <label htmlFor={label}>{label}</label>
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        id={label}
        placeholder={placeholder}
        variant="standard"
        name="text"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

