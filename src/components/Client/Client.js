import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteUser from "../DeleteUser/DeleteUser";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditNationalImages from "./../EditNationalImages/EditNationalImages";
import ResetPassword from "./../ResetPassword/ResetPassword";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import EditClient from "./../EditClient/EditClient";
import BlockIcon from "@mui/icons-material/Block";

export default function Client() {
  const { id } = useParams();
  const { token, isManager } = useContext(UserContext);
  const [clientInfo, setClientInfo] = useState({});

  useEffect(() => {
    getClientInfo();
    console.log(isManager);
    // eslint-disable-next-line
  }, []);

  const getClientInfo = async () => {
    const res = await fetch(`${API_PATH}/client/${id}`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setClientInfo({ ...data });
  };

  if (clientInfo) {
    return (
      <div className="container-xl">
        <div className="my-4 rounded bg-white p-4 position-relative w-100">
          <div className="d-flex justify-content-between">
            <div>
              <h2
                className={
                  clientInfo.is_blocked ? "text-danger" : "text-primary"
                }
              >
                {clientInfo.client_name}
                {clientInfo.is_blocked && ` (محظور) `}
              </h2>
            </div>
            {isManager && (
              <>
                <div className="d-flex justify-content-between">
                  {/* <ResetPassword id={id} role="client" /> */}
                  <EditClient userInfo={clientInfo} />
                  <BlockClient
                    id={clientInfo.client_id}
                    name={clientInfo.client_name}
                    role={clientInfo.is_blocked ? "unblock" : "block"}
                  />
                  <DeleteUser
                    user_name={clientInfo.client_name}
                    user_id={clientInfo.client_id}
                    role="client"
                  />
                </div>
              </>
            )}
          </div>
          <hr className="w-25 rounded line" />

          <p className="text-black-50">رقم العميل : {clientInfo.client_id}</p>
          <p className="text-black-50">
            اسم المندوب : {clientInfo.Sale && clientInfo.Sale.sales_name}{" "}
          </p>
          <p className="text-black-50">
            <i className="fa-solid fa-address-card fs-5"></i>
            {" " + clientInfo.national_id}
            <NationalId
              user_id={clientInfo.client_id}
              faceImg={clientInfo.face_national_id_img}
              backImg={clientInfo.back_national_id_img}
            />
          </p>
          <p className="text-black-50">
            <PhoneIcon /> {clientInfo.phone}
          </p>
          <p className="text-black-50">
            <WorkIcon /> {clientInfo.work} - {clientInfo.work_address}
          </p>
          <p className="text-black-50">
            <HomeIcon /> {clientInfo.home_address}
          </p>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

const NationalId = ({ user_id, faceImg, backImg }) => {
  const { isManager } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };

  return (
    <>
      <Button size="medium" color="primary" onClick={handleOpen}>
        عرض صورة البطاقة
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            className=" profile-image rounded text-center mx-auto w-100 my-2"
            alt={"صورة وجه البطاقة"}
            src={`data:image/png;base64, ${faceImg}`}
          />
          <img
            className=" profile-image rounded text-center mx-auto w-100 my-2"
            alt={"صورة ظهر البطاقة"}
            src={`data:image/png;base64, ${backImg}`}
          />
          {isManager && <EditNationalImages user_id={user_id} role="client" />}
        </Box>
      </Modal>
    </>
  );
};

const BlockClient = ({ id, name, role }) => {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (success) {
      alert(success);
      window.location.reload();
    }
  }, [success]);

  useEffect(() => {
    if (err) {
      alert(err);
    }
  }, [err]);

  const handleBlockSubmit = async () => {
    setIsLoading(true);
    setErr("");
    setSuccess("");

    const url = `${API_PATH}/client/block/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { Authorization: token },
    });

    setIsLoading(false);
    if (res.ok) {
      if (role === "block") {
        setSuccess(`تم حظر العميل بنجاح`);
      } else {
        setSuccess(`تم فك حظر العميل بنجاح`);
      }
    } else {
      if (role === "unblock") {
        setErr(`فشل في حظر العميل `);
      } else {
        setErr(`فشل في فك حظر العميل `);
      }
    }
  };
  return (
    <div>
      <Button size="medium" onClick={handleBlockSubmit}>
        <BlockIcon
          className={`${role === "block" ? "text-primary" : "text-danger"}`}
        />
      </Button>
    </div>
  );
};
