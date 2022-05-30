/* eslint-disable react/jsx-pascal-case */
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Profile from "./Profile/Profile";
import Managers from "./Managers/Managers";
import Branches from "./Branches/Branches";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import { UserContext } from "./UserProvider";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import My404Component from "./My404Component/My404Component";
import ROOT_PATH from "./ROOT_PATH.js";
import ResetPassword from "./ResetPassword/ResetPassword";
export default function AppRoutes() {
  const root_route = ROOT_PATH;
  const { isLogging, isBoss, isManager, isSales } = useContext(UserContext);
  return (
    <Routes>
      <Route path="*" exact={true} element={<My404Component />} />
      {isLogging ? (
        <>
          {isBoss ? (
            <>
              <Route path={`${root_route}/managers`} element={<Managers />} />
              <Route path={`${root_route}/branches`} element={<Branches />} />
            </>
          ) : null}
          {isManager ? (
            <>
              <Route path={`${root_route}/managers`} element={<Managers />} />
              <Route path={`${root_route}/branches`} element={<Branches />} />
            </>
          ) : null}
          {isSales ? (
            <>
              <Route path={`${root_route}/managers`} element={<Managers />} />
              <Route path={`${root_route}/branches`} element={<Branches />} />
            </>
          ) : null}

          <Route path={`${root_route}/profile`} element={<Profile />} />
          <Route path={`${root_route}/logout`} element={<Logout />} />
        </>
      ) : (
        <>
          <Route path={`${root_route}/`} element={<Login />} />
          <Route
            path={`${root_route}/forgetpassword`}
            element={<ForgetPassword />}
          />
          <Route
            path={`${root_route}/resetpassword/:id/:token`}
            element={<ResetPassword />}
          />
        </>
      )}
    </Routes>
  );
}
