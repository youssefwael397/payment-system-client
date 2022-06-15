import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProcessesContext } from "../ProcessesProvider";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

function Process() {
  const { id } = useParams();
  const { token } = useContext(UserContext);
  const [processMonth, setProcessMonth] = useState([]);
  const [process, setProcess] = useState([]);

  useEffect(() => {
    if (token && id) {
      getProcess(id, token);
      getProcessMonths(id, token);
      console.log(process);
      console.log(processMonth);
    }
    // eslint-disable-next-line
  }, [token, id]);

  const getProcessMonths = async (id, token) => {
    const url = `${API_PATH}/process/month/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setProcessMonth(data);
    }
  };

  const getProcess = async (id, token) => {
    const url = `${API_PATH}/process/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setProcess(data);
    }
  };

  if (process) {
    return (
      <div>
        <div>
          <p className="fw-bold">{process.process_id}</p>
          {/* <p className="fw-bold">{process.process_name}</p>
          <p className="fw-bold">{process.Sale.sales_name}</p>
          <p className="fw-bold">{process.Sale.sales_id}</p>
          <p className="fw-bold">{process.Client.client_name}</p> */}

          <hr />

          {process}

          {/* <p>{process.process_price} جنيه</p> */}
          {/* <p>العدد: {process.count} </p> */}
          {/* <p>{process.Category.category_name}</p> */}
        </div>
        <div className="d-flex justify-content-between">
          {/* <Editprocess processInfo={process} /> */}
          {/* <Deleteprocess processInfo={process} /> */}
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default Process;
