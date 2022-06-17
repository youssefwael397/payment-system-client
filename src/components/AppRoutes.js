/* eslint-disable react/jsx-pascal-case */
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import Profile from "./Profile/Profile";
import Managers from "./Managers/Managers";
import Manager from "./Manager/Manager";
import Branches from "./Branches/Branches";
import Login from "./Login/Login";
import Logout from "./Logout/Logout";
import { UserContext } from "./UserProvider";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import My404Component from "./My404Component/My404Component";
import ROOT_PATH from "./ROOT_PATH.js";
import ResetPassword from "./ResetPassword/ResetPassword";
import Home from "./Home/Home";
import SalesComponent from "./SalesComponent/SalesComponent";
import Sales from "./Sales/Sales";
import Clients from "./Clients/Clients";
import Client from "./Client/Client";
import Categories from "./Categories/Categories";
import Products from "./Products/Products";
import Processes from "./Processes/Processes";
import Process from "./Processes/Process";
import PrintInsurance from "./PrintInsurance/PrintInsurance";

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
              <Route
                path={`${root_route}/managers/manager/:id`}
                element={<Manager />}
              />
              <Route path={`${root_route}/branches`} element={<Branches />} />
            </>
          ) : null}
          {isManager ? (
            <>
              <Route
                path={`${root_route}/sales`}
                element={<SalesComponent />}
              />
              <Route path={`${root_route}/branches`} element={<Branches />} />
              <Route
                path={`${root_route}/sales/sales/:id`}
                element={<Sales />}
              />
              <Route path={`${root_route}/clients`} element={<Clients />} />
              <Route
                path={`${root_route}/clients/client/:id`}
                element={<Client />}
              />
              <Route
                path={`${root_route}/categories`}
                element={<Categories />}
              />
              <Route path={`${root_route}/products`} element={<Products />} />
              <Route path={`${root_route}/processes`} element={<Processes />} />
              <Route
                path={`${root_route}/processes/process/:id`}
                element={<Process />}
              />
              <Route
                path={`${root_route}/print`}
                element={<PrintInsurance />}
              />
            </>
          ) : null}
          {isSales ? (
            <>
              <Route path={`${root_route}/managers`} element={<Managers />} />
              <Route path={`${root_route}/branches`} element={<Branches />} />
              <Route path={`${root_route}/clients`} element={<Clients />} />
              <Route
                path={`${root_route}/clients/client/:id`}
                element={<Client />}
              />
              <Route path={`${root_route}/processes`} element={<Processes />} />
              <Route
                path={`${root_route}/processes/process/:id`}
                element={<Process />}
              />
            </>
          ) : null}

          <Route path={`${root_route}/home`} element={<Home />} />
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
