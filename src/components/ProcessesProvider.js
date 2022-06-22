import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const ProcessesContext = createContext();
export const ProcessesProvider = (props) => {
  const { token, userInfo, isManager, isSales } = useContext(UserContext);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    getAllProcesses();
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllProcesses = async () => {
    if (token && (userInfo.isSales || userInfo.isManager)) {
      let url;

      if (isManager) {
        url = `${API_PATH}/process/branch/${userInfo.branch_id}`;
      }

      if (isSales) {
        url = `${API_PATH}/process/sales/${userInfo.sales_id}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProcesses([...data]);
      }
    }
  };

  return (
    <ProcessesContext.Provider
      value={{
        processes,
      }}
    >
      {props.children}
    </ProcessesContext.Provider>
  );
};
