import React, { useState, useContext, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleApiWrapper from "./../GoogleApiWrapper/GoogleApiWrapper";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UserContext } from "./../UserProvider";
import { CategoriesContext } from "./../CategoriesProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import {
  Button,
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddBranchComponent = () => {
  const { token, userInfo } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const AddCategorySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");
    let form = new FormData();

    form.append("category_name", categoryName);
    form.append("branch_id", userInfo.branch_id);

    const res = await fetch(`${API_PATH}/category/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    return setSuccess(`تم إضافة تصنيف ${categoryName}`);
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
      onSubmit={(e) => AddCategorySubmit(e)}
    >
      <h4 className="mb-5">إضافة تصنيف</h4>
      <div className="row">
        <AddName
          name={categoryName}
          setName={setCategoryName}
          label="اسم التصنيف"
          placeholder="موبايل"
        />
        <SubmitButton submitLabel="إضافة" />

        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
};

const AddName = ({ name, setName, label, placeholder }) => {
  let nameValid = true;
  if (name) {
    const pattern = /[^a-z]/i;
    nameValid = pattern.test(name);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !nameValid && "text-danger"
      }`}
    >
      <label htmlFor={label}>{label}</label>
      {/* <br /> */}
      <TextField
        className="mx-3 w-75"
        required
        id={label}
        placeholder={placeholder}
        variant="standard"
        name="email"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};



export default AddBranchComponent;
