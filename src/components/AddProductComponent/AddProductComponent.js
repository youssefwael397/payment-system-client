import React, { useState, useContext, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleApiWrapper from "./../GoogleApiWrapper/GoogleApiWrapper";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UserContext } from "./../UserProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import { CategoriesContext } from "./../CategoriesProvider";
import {
  Button,
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddProductComponent = () => {
  const { token, userInfo } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [count, setCount] = useState();
  const [categoryId, setCategoryId] = useState("");

  const AddProductSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");
    let form = new FormData();

    form.append("branch_id", userInfo.branch_id);
    form.append("category_id", categoryId);
    form.append("product_name", productName);
    form.append("product_price", productPrice);
    form.append("count", count);

    const res = await fetch(`${API_PATH}/product/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    return setSuccess(`تم إضافة منتج ${productName}`);
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
      onSubmit={(e) => AddProductSubmit(e)}
    >
      <h4 className="mb-5">إضافة منتج</h4>
      <div className="row">
        <AddName
          name={productName}
          setName={setProductName}
          label="اسم المنتج"
          placeholder="سامسونج a5"
        />
        <CategorySelectOptions
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <CountInput count={count} setCount={setCount} />
        <PriceInput price={productPrice} setPrice={setProductPrice} />
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
  // if (name) {
  //   const pattern = /[^a-z]/i;
  //   nameValid = pattern.test(name);
  // }
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

const CategorySelectOptions = ({ categories, categoryId, setCategoryId }) => {
  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };

  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor="branchSelectOption">التصنيف</label>
      {/* <br /> */}
      <FormControl className="mx-3 w-50 " variant="standard">
        <Select
          label="التصنيف"
          id="branchSelectOption"
          value={categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.category_id}
              value={category.category_id}
            >
              {category.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const CountInput = ({ count, setCount }) => {
  return (
    <div className={`mb-4 col-md-6 col-xs-12 font-cairo`}>
      <label htmlFor="count">عدد المنتج</label>
      {/* <br /> */}
      <TextField
        className="mx-3 w-75"
        required
        id="count"
        placeholder="10"
        variant="standard"
        name="count"
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
    </div>
  );
};

const PriceInput = ({ price, setPrice }) => {
  return (
    <div className={`mb-4 col-md-6 col-xs-12 font-cairo`}>
      <label htmlFor="price">سعر المنتج</label>
      {/* <br /> */}
      <TextField
        className="mx-3 w-75"
        required
        id="price"
        placeholder="7999"
        variant="standard"
        name="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  );
};

export default AddProductComponent;
