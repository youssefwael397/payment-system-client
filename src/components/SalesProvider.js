import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const SalesContext = createContext();
export const SalesProvider = (props) => {
  const { token, userInfo } = useContext(UserContext);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (userInfo) {
      getAllSales();
    }
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllSales = async () => {
    if (token && userInfo.branch_id) {
      const url = `${API_PATH}/sales/branch/${userInfo.branch_id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setSales([...data]);
    }
  };

  return (
    <SalesContext.Provider
      value={{
        sales,
      }}
    >
      {props.children}
    </SalesContext.Provider>
  );
};
