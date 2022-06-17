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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DangerousIcon from "@mui/icons-material/Dangerous";

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

function ConfirmMonthCashing({ id, role }) {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (success) {
      alert(success);
      window.location.reload()
    }
  }, [success]);

  useEffect(() => {
    if (err) {
      alert(err);
    }
  }, [err]);

  const handleUpdate = async () => {
    setIsLoading(true);
    setErr("");
    setSuccess("");

    const url = `${API_PATH}/process/update/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: token },
    });

    setIsLoading(false);
    if (res.ok) {
      if (role === "cash") {
        setSuccess(`تم تأكيد دفع الشهر بنجاح`);
      } else {
        setSuccess(`تم عدم تأكيد دفع الشهر بنجاح`);
      }
    } else {
      if (role === "cash") {
        setErr(`فشل في تأكيد دفع الشهر`);
      } else {
        setErr(`فشل في عدم تأكيد دفع الشهر`);
      }
    }
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleUpdate}>
        {role === "cash" ? (
          <DangerousIcon className="text-danger" />
        ) : (
          <CheckCircleIcon className="text-primary" />
        )}
      </Button>
    </div>
  );
}

export default ConfirmMonthCashing;
