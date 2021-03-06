import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../UserProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import AddImage from "./../AddImage/AddImage";
import { ClientsContext } from "./../ClientsProvider";
import { ProductsContext } from "./../ProductsProvider";
import { TextField, MenuItem, FormControl, Select } from "@mui/material";

function AddProcessComponent() {
  const { token, userInfo } = useContext(UserContext);
  const { clients } = useContext(ClientsContext);
  const { products } = useContext(ProductsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [clientList, setClientList] = useState([]);
  const [clientId, setClientId] = useState();
  const [productId, setProductId] = useState();
  const [firstPrice, setFirstPrice] = useState();
  const [monthCount, setMonthCount] = useState();
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [insurancePaper, setInsurancePaper] = useState();

  useEffect(() => {
    if (clients) {
      let new_clients = [];
      clients.map((client) => {
        if (!client.is_blocked) {
          new_clients = [...new_clients, client];
        }
      });
      if (new_clients) {
        setClientList([...new_clients]);
      }
    }
  }, [clients]);

  const AddProcessSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    let form = new FormData();
    form.append("sales_id", userInfo.sales_id);
    form.append("client_id", clientId);
    form.append("product_id", productId);
    form.append("first_price", firstPrice);
    form.append("month_count", monthCount);
    form.append("first_date", firstDate);
    form.append("last_date", lastDate);
    form.append("final_price", finalPrice);
    form.append("insurance_paper", insurancePaper);

    const url = `${API_PATH}/process/create`;
    const res = await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    const success = `???? ?????????? ?????????????? ??????????`;
    return setSuccess(success);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  return (
    <form
      className={` w-100 bg-white my-4 rounded shadow-lg p-4 ${
        isLoading && "opacity-50"
      } position-relative`}
      onSubmit={(e) => AddProcessSubmit(e)}
    >
      <h4 className="mb-5">?????????? ??????????</h4>
      <div className="row">
        <SelectOptions
          options={clientList}
          optionId={clientId && clientId}
          setOptionId={setClientId}
          type={"clients"}
          label="????????????"
        />

        <SelectOptions
          options={products && products}
          optionId={productId && productId}
          setOptionId={setProductId}
          label="????????????"
        />

        <NumberInput
          number={firstPrice}
          setNumber={setFirstPrice}
          label={"????????????"}
          placeholder={"900"}
        />
        <NumberInput
          number={monthCount}
          setNumber={setMonthCount}
          label={"?????? ????????????"}
          placeholder={"12"}
        />
        <DateInput
          date={firstDate}
          setDate={setFirstDate}
          label={"?????????? ?????? ??????"}
          placeholder={"06/2022"}
        />
        <DateInput
          date={lastDate}
          setDate={setLastDate}
          label={"?????????? ?????? ??????"}
          placeholder={"05/2023"}
        />
        <NumberInput
          number={finalPrice}
          setNumber={setFinalPrice}
          label={"?????????? ?????????????? ???????? ????????????"}
          placeholder={"5000"}
        />
        <AddImage
          image={insurancePaper}
          setImage={setInsurancePaper}
          inputLabel={"???????? ??????????"}
        />
        <SubmitButton submitLabel="??????????" />
        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
}

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
              key={type === "clients" ? option.client_id : option.product_id}
              value={type === "clients" ? option.client_id : option.product_id}
            >
              {type === "clients" ? option.client_name : option.product_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const DateInput = ({ date, setDate, label, placeholder }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setDate(`${month}/${year}`);
  }, [month, year]);

  const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const YEARS = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

  return (
    <div className={`mb-4 col-md-6 col-xs-12 font-cairo `}>
      <div className="d-flex align-items-center">
        <label>{label}</label>
        <FormControl className="mx-2 w-50" variant="standard">
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <MenuItem selected defaultValue="??????????" disabled>??????????</MenuItem>
            {MONTHS.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="mx-2 w-50" variant="standard">
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <MenuItem selected defaultValue="??????????" disabled>??????????</MenuItem>
            {YEARS.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const NumberInput = ({ number, setNumber, label, placeholder }) => {
  let validDate = true;
  if (number) {
    const pattern = /^\d{1,}$/;
    validDate = pattern.test(number);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validDate && "text-danger"
      }`}
    >
      <label htmlFor={label}>{label}</label>
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        id={label}
        placeholder={placeholder}
        variant="standard"
        name="text"
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </div>
  );
};

export default AddProcessComponent;
