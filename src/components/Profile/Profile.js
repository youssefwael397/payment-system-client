import React, { useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from "../ROOT_PATH";
import userIcon from "./user-icon.png";
import CircularProgress from "@mui/material/CircularProgress";
import EditProfile from "./../EditProfile/EditProfile";
import ResetPassword from "./../ResetPassword/ResetPassword";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function Profile() {
  const { user, userInfo, image, isBoss, isLogging, isManager, isSales } =
    useContext(UserContext);
  useEffect(() => {
    if (!isLogging) {
      window.location = `${ROOT_PATH}/`;
    }
  }, [isLogging]);

  if (isLogging && user && userInfo) {
    return (
      <div className="d-flex align-items-center justify-content-center page-vh">
        <div className="shadow-lg profile-card mx-auto animate__animated animate__scrollUp ">
          <div className="profile-card-top">
            <img
              className="profile-card-img"
              src={`${isBoss ? userIcon : `data:image/png;base64, ${image}`}`}
              alt=""
            />
          </div>
          <div className="profile-card-bottom mx-auto text-center ">
            {isBoss && <p>{userInfo.boss_name}</p>}
            {isManager && <p>{userInfo.manager_name}</p>}
            {isSales && <p>{userInfo.sales_name}</p>}
            {userInfo.email && <p>{userInfo.email && userInfo.email}</p>}
            {!isBoss ? (
              <>
                {userInfo.phone && <p>{userInfo.phone}</p>}
                {userInfo.national_id && <p>{userInfo.national_id}</p>}
                {userInfo.Branch && <p>فرع {userInfo.Branch.branch_name}</p>}
                <NationalId
                  faceImg={userInfo.face_national_id_img}
                  backImg={userInfo.back_national_id_img}
                />
              </>
            ) : null}
            <div className="position-absolute bottom-0 start-50 translate-middle">
              <div className="mx-auto text-center d-flex justify-content-between">
                {isBoss && <EditProfile />}
                {isBoss && (
                  <ResetPassword role={"boss"} user_id={userInfo.boss_id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Box className="profile-page-vh d-flex align-items-center justify-content-center">
        <CircularProgress />
      </Box>
    );
  }
}

const NationalId = ({ faceImg, backImg }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 600,
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
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
