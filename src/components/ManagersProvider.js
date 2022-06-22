import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const ManagersContext = createContext();
export const ManagersProvider = (props) => {
  const { token, userInfo } = useContext(UserContext);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getAllManagers();
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllManagers = async () => {
    if (token && userInfo.isBoss) {
      const url = `${API_PATH}/manager/`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setManagers([...data]);
    }
  };

  return (
    <ManagersContext.Provider
      value={{
        managers,
      }}
    >
      {props.children}
    </ManagersContext.Provider>
  );
};
