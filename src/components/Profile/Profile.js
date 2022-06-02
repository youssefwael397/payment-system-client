import React, { useEffect, useContext } from "react";
import {
  Box,
} from "@mui/material";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from "../ROOT_PATH";
import userIcon from "./user-icon.png";
import CircularProgress from "@mui/material/CircularProgress";
function Profile() {
  const { user, userInfo, image, isBoss, isLogging } =
    useContext(UserContext);
  useEffect(() => {
    if (!isLogging) {
      window.location = `${ROOT_PATH}/`;
    }
  }, [isLogging]);

  if (isLogging && user && userInfo) {
    return <div className="container-xl mx-auto login-page-vh d-flex align-items-center justify-content-center ">
      <div className="shadow-lg profile-card mx-auto animate__animated animate__scrollUp">
        <div className="profile-card-top">
          <img className="profile-card-img" src={`${isBoss ? userIcon : `data:image/png;base64, ${image}`}`} alt="" />
        </div>
        <div className="profile-card-bottom mx-auto text-center font-cairo">

          {
            user.name && <p className="fs-4">{user.name}</p>
          }
          {
            userInfo.email && <p>{userInfo.email && userInfo.email}</p>
          }
          {
            !isBoss
              ? (
                <>
                  {userInfo.phone && <p >{userInfo.phone}</p>}
                  {userInfo.national_id && <p >{userInfo.national_id}</p>}
                  {
                    userInfo.Branch && <p >فرع {userInfo.Branch.branch_name}</p>
                  }
                </>
              ) : (null)
          }
        </div>
      </div>
      {/* <div className="border-shape-1 animate__animated animate__fadeIn animate__infinite animate__slow"></div>
      <div className="border-shape-2 animate__animated animate__fadeIn animate__infinite animate__slower"></div>
      <div className="border-shape-3 animate__animated animate__fadeIn animate__infinite "></div>
      <div className="border-shape-4 animate__animated animate__fadeIn animate__infinite animate__fast"></div>
      <div className="border-shape-5 animate__animated animate__fadeIn animate__infinite animate__faster"></div>
      <div className="border-shape-6 animate__animated animate__fadeIn animate__infinite "></div> */}
    </div>;
  } else {
    return (
      <Box className="profile-page-vh d-flex align-items-center justify-content-center">
        <CircularProgress />
      </Box>
    );
  }
}

export default Profile;
