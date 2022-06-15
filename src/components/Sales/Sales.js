import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import DeleteUser from "../DeleteUser/DeleteUser";
import API_PATH from "./../API_PATH";
import { UserContext } from "./../UserProvider";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditImage from "./../EditImage/EditImage";
import EditNationalImages from "./../EditNationalImages/EditNationalImages";
import ResetPassword from "./../ResetPassword/ResetPassword";
import EditSales from './../EditSales/EditSales';

export default function Sales() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [salesInfo, setSalesInfo] = useState({});

  useEffect(() => {
    getSalesInfo();
    // eslint-disable-next-line 
  }, []);

  const getSalesInfo = async () => {
    const res = await fetch(`${API_PATH}/sales/${id}`, {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setSalesInfo({ ...data });
  };

  if (salesInfo) {
    return (
      <div className="container-xl">
        <div className="my-4 rounded bg-white p-4 position-relative w-100">
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-xs-12 text-center mx-auto  mb-3">
              <div className=" position-relative">
                <img
                  className="profile-image rounded text-center mx-auto w-100"
                  alt={salesInfo.sales_name}
                  src={`data:image/png;base64, ${salesInfo.sales_img}`}
                  height={"40%"}
                />
                <EditImage user_id={id} role="sales" label={"صورة المندوب"} />
              </div>
            </div>
            <div className=" col-lg-6 col-sm-6 col-xs-12 ">
              <div className="d-flex justify-content-between">
                <div>
                  <h2 className="text-primary">{salesInfo.sales_name}</h2>
                </div>
                <div className="d-flex justify-content-between">
                  <ResetPassword id={id} role="sales" />
                  <EditSales userInfo={salesInfo} />
                  <DeleteUser
                    user_name={salesInfo.sales_name}
                    user_id={salesInfo.sales_id}
                    role="sales"
                  />
                </div>
              </div>
              <hr className="w-25 rounded line" />
              <p className="text-black-50 my-3">
                <EmailIcon /> {salesInfo.email}
              </p>
              <p className="text-black-50">
                <i className="fa-solid fa-address-card fs-5"></i>
                {" " + salesInfo.national_id}
                <NationalId
                  user_id={salesInfo.sales_id}
                  faceImg={salesInfo.face_national_id_img}
                  backImg={salesInfo.back_national_id_img}
                />
              </p>
              <p className="text-black-50">
                <PhoneIcon /> {salesInfo.phone}
              </p>
              <p>
                <a
                  className="text-decoration-none text-black-50"
                  target="_blank"
                  href={salesInfo.facebook_link}
                  rel="noreferrer"
                >
                  <FacebookIcon /> Facebook
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

const NationalId = ({ user_id, faceImg, backImg }) => {
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
    overflow: 'auto'
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
          <EditNationalImages user_id={user_id} role="sales" />
        </Box>
      </Modal>
    </>
  );
};
