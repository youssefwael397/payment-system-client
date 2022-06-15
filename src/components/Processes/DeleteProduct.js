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
import DeleteIcon from "@mui/icons-material/Delete";

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

function DeleteProduct({ productInfo }) {
  const { token } = useContext(UserContext);
  const [productName, setProductName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (productInfo) {
      setProductName(productInfo.product_name);
    }
  }, [productInfo]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    const url = `${API_PATH}/product/${productInfo.product_id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    // const data = await res.json();
    setIsLoading(false);
    if (res.ok) {
      setSuccess(`تم حذف المنتج بنجاح`);
      window.location.reload();
    } else {
      setErr(`فشل في حذف المنتج ${productInfo.product_name}`);
    }
  };

  if (productInfo) {
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
              <p>هل انت متأكد من حذف {productInfo.product_name}</p>

              <SubmitButton submitLabel="حذف" />
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

export default DeleteProduct;
