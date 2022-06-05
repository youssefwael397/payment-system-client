import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const CategoriesContext = createContext();
export const CategoriesProvider = (props) => {
  const { token, userInfo } = useContext(UserContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userInfo]);

  const getAllCategories = async () => {
    const url = `${API_PATH}/category/branch/${userInfo.branch_id}`;
    if (token && userInfo.branch_id) {
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
