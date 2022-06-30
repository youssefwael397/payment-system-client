import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const ClientsContext = createContext();
export const ClientsProvider = (props) => {
  const { token, user, isManager, userInfo } = useContext(UserContext);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (token && userInfo) {
      getAllClients();
    }
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllClients = async () => {
    let url;
    // for sales home page
    url = `${API_PATH}/client/sales/${userInfo.sales_id}`;
    // for manager home page
    if (isManager) {
      url = `${API_PATH}/client/branch/${userInfo.branch_id}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    setClients([...data]);
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
      }}
    >
      {props.children}
    </ClientsContext.Provider>
  );
};
