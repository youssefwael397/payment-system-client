import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

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

function LockBranch({ id, role }) {
  const { token } = useContext(UserContext);
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

    const url = `${API_PATH}/branch/${role}/${id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: token },
    });
    if (res.ok) {
      window.location.reload();
    }
  };

  if (id) {
    return (
      <>
        <Button size="small" color="primary" onClick={handleOpen}>
          {role === "unlock" ? (
            <i class="fa-solid fa-lock text-danger"></i>
          ) : (
            <i class="fa-solid fa-lock-open"></i>
          )}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form sx={style} onSubmit={(e) => handleUpdate(e)}>
              {role === "lock" ? (
                <>
                  <h5>هل انت متأكد من غلق الفرع؟</h5>
                  <p>
                    ملحوظة: غلق الفرع يؤدي إلى عدم إمكانية كلا من مدير و مناديب
                    الفرع من الدخول
                  </p>
                </>
              ) : (
                <h5 className="my-2">هل انت متأكد من فتح الفرع؟</h5>
              )}
              <SubmitButton submitLabel={role === "lock" ? "غلق" : "فتح"} />
              {success && <p className="text-center text-success">{success}</p>}
              {err && <p className="text-center text-danger">{err}</p>}
              {isLoading ? <LoadingSpinner /> : null}
            </form>
          </Box>
        </Modal>
      </>
    );
  }
}

export default LockBranch;
