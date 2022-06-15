import React, { useState, useEffect, createContext } from "react";
import { useJwt } from "react-jwt";
import API_PATH from "./API_PATH";

export const UserContext = createContext();
export const UserProvider = (props) => {
  const [token, setToken] = useState();
  const [isLogging, setIsLogging] = useState(false);
  const { decodedToken, isExpired } = useJwt(token);
  const [isBoss, setIsBoss] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [image, setImage] = useState();

  // token
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    } else {
      setToken(null);
    }
  }, [token]);

  // isLogging
  useEffect(() => {
    if (window.localStorage.getItem("isLogging")) {
      setIsLogging(window.localStorage.getItem("isLogging"));
    } else {
      setIsLogging(false);
    }
  }, [isLogging]);

  useEffect(() => {
    if (token) {
      if (decodedToken) {
        setUser({ ...decodedToken });
        setIsBoss(decodedToken.is_boss);
        setIsManager(decodedToken.is_manager);
        setIsSales(decodedToken.is_sales);
      }
    }
  }, [decodedToken, token]);

  useEffect(() => {
    if (decodedToken) {
      if (isExpired) {
        window.localStorage.clear();
        window.location.href = "/";
      }
    }
  }, [decodedToken, isExpired]);

  useEffect(() => {
    if (user && (isBoss || isManager || isSales)) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (isManager && userInfo) {
      setImage(userInfo.manager_img);
    } else if (isSales && userInfo) {
      setImage(userInfo.sales_img);
    }
  }, [isManager, isSales, isBoss, userInfo]);

  const getUserInfo = async () => {
    let url;
    if (isBoss) {
      url = `${API_PATH}/boss`;
    }
    if (isManager) {
      url = `${API_PATH}/manager/${user.id}`;
    }
    if (isSales) {
      url = `${API_PATH}/sales/${user.id}`;
    }
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setUserInfo({ ...data });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userInfo,
        token,
        image,
        isLogging,
        isBoss,
        isManager,
        isSales,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
