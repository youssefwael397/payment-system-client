import React from "react";
import AddCategoryComponent from "./../AddCategoryComponent/AddCategoryComponent";
import AddProductComponent from "./../AddProductComponent/AddProductComponent";
import AddSalesComponent from "./../AddSalesComponent/AddSalesComponent";
export default function ManagerHome() {
  return (
    <div>
      <AddCategoryComponent />
      <AddProductComponent />
      <AddSalesComponent />
    </div>
  );
}
