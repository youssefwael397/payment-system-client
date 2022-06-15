import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./../ProductsProvider";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { TextField } from "@mui/material";

function Products() {
  const { products } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue !== "") {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.product_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            product.Category.category_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchValue]);

  if (products) {
    return (
      <div>
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="ابحث باسم المنتج او تصنيف المنتج"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        {filteredProducts.map((product) => (
          <div
            key={product.product_name}
            className={` w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}
          >
            <div>
              <p className="fw-bold">{product.product_name}</p>
              <p>{product.product_price} جنيه</p>
              <p>العدد: {product.count} </p>
              <p>{product.Category.category_name}</p>
            </div>
            <div className="d-flex justify-content-between">
              <EditProduct productInfo={product} />
              <DeleteProduct productInfo={product} />
            </div>
          </div>
        ))}
        {filteredProducts.length < 1 && searchValue ? (
          <h4 className="mt-3">
            لا يوجد منتج بهذا الإسم{" "}
            <span className="text-primary">{searchValue.trim()}</span>
          </h4>
        ) : null}
      </div>
    );
  } else {
    return (
      <div
        className={` w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}
      >
        لا يوجد منتجات
      </div>
    );
  }
}

export default Products;
