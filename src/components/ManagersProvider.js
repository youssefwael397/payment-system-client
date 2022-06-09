import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const ManagersContext = createContext();
export const ManagersProvider = (props) => {
  const { token, isBoss } = useContext(UserContext);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getAllManagers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getAllManagers = async () => {
    const url = `${API_PATH}/manager/`;
    if (token) {
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
