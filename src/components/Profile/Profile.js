import React, { useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from "../ROOT_PATH";
import userIcon from "./user-icon.png";
import CircularProgress from "@mui/material/CircularProgress";
import EditProfile from "./../EditProfile/EditProfile";
import ResetPassword from "./../ResetPassword/ResetPassword";
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

export default Profile;
