import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const BranchesContext = createContext();
export const BranchesProvider = (props) => {
  const { token } = useContext(UserContext);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    getAllBranches();
  }, [token]);

  const getAllBranches = async () => {
    const url = `${API_PATH}/branch/`;
    if (token) {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
      setBranches([...data]);
    }
  };

  return (
    <BranchesContext.Provider
      value={{
        branches,
      }}
    >
      {props.children}
    </BranchesContext.Provider>
  );
};
