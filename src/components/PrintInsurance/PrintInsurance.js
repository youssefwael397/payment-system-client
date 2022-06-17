import React, { useState, useEffect, useContext } from "react";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import { SalesContext } from "./../SalesProvider";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import SubmitButton from "./../SubmitButton/SubmitButton";

function PrintInsurance() {
  const { token } = useContext(UserContext);
  const { sales } = useContext(SalesContext);
  const [months, setMonths] = useState();
  const [month, setMonth] = useState();
  const [salesId, setSalesId] = useState();
  const [processes, setProcesses] = useState();

  useEffect(() => {
    getAllMonths();
  }, []);

  const monthsCreator = () => {
    const d = new Date();
    let text = d.toLocaleDateString();
    let date = text.split("/");
    let month = date[0];
    let year = date[2];

    let monthList = [];

    for (let i = 0; i < 12; i++) {
      if (i > 0) {
        month = +month + 1;
      }

      if (month > 12) {
        month = 1;
        year = +year + 1;
      }

      let new_month = `${month}/${year}`;
      monthList = [...monthList, new_month];
    }
    console.log(monthList);
    return monthList;
  };

  const getAllMonths = () => {
    const months = monthsCreator();
    setMonths(months);
  };

  const getAllProcesses = async (e) => {
    e.preventDefault();
    const url = `${API_PATH}/process/print/data`;
    let form = new FormData();
    form.append("sales_id", salesId);
    form.append("date", month);

    const res = await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setProcesses(data);
      alert("Done");
    } else {
      alert("Failed");
    }
    console.log(processes);
  };

  return (
    <div
      className={`text-decoration-none mx-2 w-100 bg-white my-4 rounded shadow-lg p-4 `}
    >
      <form
        className="row d-flex justify-content-between align-items-center"
        onSubmit={(e) => getAllProcesses(e)}
      >
        {months && (
          <DateSelectOptions
            options={months && months}
            optionId={month && month}
            setOptionId={setMonth}
            label={"الشهر"}
          />
        )}
        {/* <br /> */}
        {sales && (
          <SelectOptions
            options={sales}
            optionId={salesId}
            setOptionId={setSalesId}
            type={"sales"}
            label="المندوب"
          />
        )}
        {/* <br />  */}
        <SubmitButton submitLabel={"طباعة"} />
      </form>
    </div>
  );
}

const DateSelectOptions = ({ options, optionId, setOptionId, label }) => {
  const handleChange = (event) => {
    setOptionId(event.target.value);
  };

  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor={label}>{label}</label>
      {/* <br /> */}
      <FormControl className="mx-3 w-50 " variant="standard">
        <Select
          label={label}
          id={label}
          value={optionId}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const SelectOptions = ({ options, optionId, setOptionId, label, type }) => {
  const handleChange = (event) => {
    setOptionId(event.target.value);
  };

  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor={label}>{label}</label>
      {/* <br /> */}
      <FormControl className="mx-3 w-50 " variant="standard">
        <Select
          label={label}
          id={label}
          value={optionId}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem
              key={type === "sales" ? option.sales_id : option.product_id}
              value={type === "sales" ? option.sales_id : option.product_id}
            >
              {type === "sales" ? option.sales_name : option.product_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PrintInsurance;
