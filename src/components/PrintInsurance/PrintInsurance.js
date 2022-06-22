import React, { useState, useEffect, useContext, useRef } from "react";
import API_PATH from "../API_PATH";
import { UserContext } from "./../UserProvider";
import { SalesContext } from "./../SalesProvider";
import { FormControl, MenuItem, Select } from "@mui/material";
import SubmitButton from "./../SubmitButton/SubmitButton";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";
import docx, { Packer, Paragraph, TextRun } from "docx";
// import { experiences, education, skills, achievements } from "./cv-data";
// import { createClientsList } from "./InsuranceGenerator";
// import fs from 'fs';
import ReactToPrint from 'react-to-print';

function PrintInsurance() {
  const { token } = useContext(UserContext);
  const { sales } = useContext(SalesContext);
  const [months, setMonths] = useState(['6/2022']);
  const [month, setMonth] = useState();
  const [salesId, setSalesId] = useState();
  const [processes, setProcesses] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const printContentRef = useRef();

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
      setProcesses([...data.data]);
      setTotalPrice(data.total_price);
      // alert("Done");
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
            options={months}
            optionId={month}
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
        <SubmitButton submitLabel={"بحث"} />
      </form>
      <div >
        <ReactToPrint
          trigger={() => {
            return <button className="btn btn-primary">طباعة</button>
          }}
          content={() => printContentRef.current}
          documentTitle="new document"
        // pageStyle="print"
        />
      </div>
      {processes.length > 0 ? (
        <>
          <hr />
          <h4 className="text-center">مديونية العملاء المستحقة عن شهر {month} للمندوب {processes[0].sales_name} = {totalPrice}</h4>
          < hr />
        </>
      ) : null}
      <div ref={printContentRef} className="p-4 rtl">
        <ContentToPrint processes={processes} />
      </div>
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
      {
        options &&
        <FormControl className="mx-3 w-50 " variant="standard">
          <Select
            label={label}
            id={label}
            value={optionId}
            onChange={handleChange}
            required={true}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }

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
          required={true}
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

const ContentToPrint = ({ index, processes }) => {
  return processes.map((process) => (
    <div className="insurance-card">

      <div className="insurance_head d-flex justify-content-between align-items-center">
        <div>
          <table class="table table-bordered border-dark border-2">
            <tbody>
              <tr>
                <td>رقم العميل </td>
                <td className="text-center">{process.client_id}</td>
              </tr>
              <tr>
                <td>المقدم </td>
                <td>{process.first_price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <h2 className="text-primary">{process.branch_name}</h2>
          <p>لأجهزة المحمول - مصحف الكترونى - لاب توب </p>
          {/* <span>(بنظام القسط )</span> */}
        </div>
        <div>
          <table class="table table-bordered border-dark border-2 mx-2">
            <tbody>
              <tr className="p-2">
                <td>&ensp;</td>
              </tr>
              <tr>
                <td className="text-center">{process.month_count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="insurance_body border border-2 border-dark rounded-3 p-4 my-2 ">
        <div className="">
          {/* first row */}
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p>الاســـــــــــــــــم :
                <span className="fw-bold">&ensp; {process.client_name}</span>
              </p>
            </div>
            <div>
              <p> رقم التليفون  :
                <span className="fw-bold">&ensp; {process.phone}</span>
              </p>
            </div>
            <div>
              <p> العنوان/منزل  :
                <span className="fw-bold">&ensp; {process.home_address}</span>
              </p>
            </div>
          </div>

          {/* second row */}

          <div className="d-flex align-items-center justify-content-between">
            <div >
              <p> السلعة :
                <span className="fw-bold">&ensp; {process.product_name}</span>
              </p>
            </div>
            <div >
              <p> العمــــــــــــــل  :
                <span className="fw-bold">&ensp; {process.work_address}</span>
              </p>
            </div>
            <div >
              <p> الوظيفة  :
                <span className="fw-bold">&ensp; {process.work}</span>
              </p>
            </div>
          </div>

          {/* third row */}

          <div className="d-flex align-items-center justify-content-between">

            <div >
              <p> الإجمالــــــى  : <span className="rounded-3 border border-dark border-3 p-1">&emsp;  &emsp; &emsp; &emsp; &emsp; &emsp;</span></p>
            </div>
            <div >
              <p> نظام القسط  : <span className="rounded-3 border border-dark border-3 p-1">&emsp;  &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;</span></p>
            </div>
          </div>

          <p>
            بموجب هذه الكمبيالة أتعهد أنا بأن أدفع مبلغ
            {" "}
            <span className="rounded-3 border border-dark border-3 px-2 fw-bold">{process.price}</span>
            {" "}
            جنيه فقط لا غير في تاريخ : &emsp; / &emsp; / &emsp; 20
          </p>

          {/* forth row */}

          <div className="d-flex align-items-center justify-content-between">
            <div >
              <p>شهر :
                <span className="fw-bold">&ensp; {process.date}</span>
              </p>
            </div>
            <div >
              <p> المندوب  :
                <span className="fw-bold">&ensp;{process.sales_name}</span>
              </p>
            </div>
            <div >
              <p> المقر بما فيه  : &ensp;
                <span className="rounded-3 border border-3 p-2  fs-4 text-secondary">{process.branch_name}</span>
              </p>
            </div>
          </div>

          {/* fifth row */}

          <div className="d-flex justify-content-between align-items-center">
            <p>الفروع : قنا – المنصورة – الزقازيق – كفر الشيخ – السويس </p>
          </div>

        </div>
      </div>
      {
        index !== processes.length - 1 ? (
          <>
            <br />
            <hr className="mx-auto text-center w-75 border border-primary" />
            <br />
          </>
        ) : null
      }
    </div>
  ));
};

export default PrintInsurance;
