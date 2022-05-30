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

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));
    } else {
      setToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (window.localStorage.getItem("isLogging")) {
      setIsLogging(window.localStorage.getItem("isLogging"));
    } else {
      setIsLogging(false);
    }
  }, [isLogging]);

  //   useEffect(() => {
  //     if (user) {
  //       getUserInfo();
  //     }
  //     console.log(user);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [user]);

  useEffect(() => {
    if (token) {
      if (decodedToken) {
        console.log(decodedToken);
        setUser({ ...decodedToken });
        setIsBoss(decodedToken.is_boss);
        setIsManager(decodedToken.is_manager);
        setIsSales(decodedToken.is_sales);
      }
    }
  }, [decodedToken, isBoss, token]);

  useEffect(() => {
    console.log("expired");
    console.log(isExpired);
    if (decodedToken) {
      if (isExpired) {
        window.localStorage.clear();
        window.location.href = "/";
      }
    }
  }, [decodedToken, isExpired]);

  //   useEffect(() => {
  //     setImage(userInfo.image);
  //   }, [userInfo]);

  //   const getUserInfo = async () => {
  //     if (user.user_id) {
  //       await fetch(`${API_PATH}//${user.user_id}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setUserInfo(data);
  //         });
  //     }
  //   };

  return (
    <UserContext.Provider
      value={{
        user,
        userInfo,
        image,
        token,
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
