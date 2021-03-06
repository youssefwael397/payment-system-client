import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const CategoriesContext = createContext();
export const CategoriesProvider = (props) => {
  const { token, userInfo, isManager } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllCategories = async () => {
    const url = `${API_PATH}/category/branch/${userInfo.branch_id}`;
    if (token && isManager) {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCategories([...data]);
      }
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
