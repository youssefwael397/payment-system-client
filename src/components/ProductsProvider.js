import React, { useState, useEffect, createContext, useContext } from "react";
import { UserContext } from "./UserProvider";
import API_PATH from "./API_PATH";

export const ProductsContext = createContext();
export const ProductsProvider = (props) => {
  const { token, userInfo, isSales , isManager} = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [token, userInfo]);

  const getAllProducts = async () => {
    const url = `${API_PATH}/product/branch/${userInfo.branch_id}`;
    if (token && (isSales || isManager)) {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts([...data]);
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
