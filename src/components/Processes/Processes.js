import React, { useContext, useEffect, useState } from "react";
import { ProcessesContext } from "../ProcessesProvider";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function Processes() {
  const { processes } = useContext(ProcessesContext);
  const [filteredProcesses, setFilteredProcesses] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(processes);
    if (searchValue !== "") {
      setFilteredProcesses(
        processes.filter(
          (process) =>
            process.Sale.sales_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            String(process.process_id)
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            process.Product.product_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            process.first_date
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim()) ||
            process.Client.client_name
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim())
        )
      );
    } else {
      setFilteredProcesses([...processes]);
    }
  }, [processes, searchValue]);

  if (processes) {
    return (
      <div>
        {/* search input */}
        <TextField
          className="w-100 my-2 "
          id="outlined-basic"
          hiddenLabel
          variant="filled"
          placeholder="ابحث باسم العميل أو رقم العملية أو اسم المنتج أو تاريخ اول قسط"
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        {filteredProcesses.map((process) => (
          <Link
            to={`process/${process.process_id}`}
            key={process.process_id}
            className={`text-decoration-none mx-2 w-100 bg-white my-4 rounded shadow-lg p-4 d-flex justify-content-between align-items-center`}
          >
            <div>
              <p>رقم العملية : {process.process_id}</p>
              <p>اسم العميل : {process.Client.client_name}</p>
              <p>المنتج : {process.Product.product_name}</p>
              <p>التاريخ : {process.first_date}</p>
              {/* <p>{process.process_price} جنيه</p> */}
              {/* <p>العدد: {process.count} </p> */}
              {/* <p>{process.Category.category_name}</p> */}
            </div>
            <div className="d-flex justify-content-between">
              {/* <Editprocess processInfo={process} /> */}
              {/* <Deleteprocess processInfo={process} /> */}
            </div>
          </Link>
        ))}

        {filteredProcesses.length < 1 && searchValue ? (
          <h4 className="mt-3">
            لا يوجد عملية بهذه البيانات{" "}
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

export default Processes;
