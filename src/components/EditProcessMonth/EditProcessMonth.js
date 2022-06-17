import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";

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

function EditProcessMonth({ monthInfo }) {
  const { token } = useContext(UserContext);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (monthInfo) {
      setPrice(monthInfo.price);
    }
  }, [monthInfo]);

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

    const url = `${API_PATH}/process/month/update/${monthInfo.process_month_id}`;

    let form = new FormData();
    form.append("price", price);

    const res = await fetch(url, {
      method: "PUT",
      body: form,
      headers: { Authorization: token },
    });

    const data = await res.json();
    setIsLoading(false);
    if (res.ok) {
      setSuccess(`تم تعديل السعر بنجاح`);
    } else {
      setErr(`فشل في تعديل السعر ${monthInfo.sales_name}`);
    }
  };

  if (monthInfo) {
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
            <h5>تعديل قيمة شهر {monthInfo.date}</h5>
            <form sx={style} onSubmit={(e) => handleUpdate(e)}>
              <NumberInput
                number={price}
                setNumber={setPrice}
                placeholder={"500"}
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

const NumberInput = ({ number, setNumber, placeholder }) => {
  let validDate = true;
  if (number) {
    const pattern = /^\d{1,}$/;
    validDate = pattern.test(number);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validDate && "text-danger"
      }`}
    >
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        placeholder={placeholder}
        variant="standard"
        name="text"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </div>
  );
};

export default EditProcessMonth;
