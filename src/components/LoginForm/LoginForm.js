import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";
import API_PATH from "../API_PATH";
import LinearProgress from "@mui/material/LinearProgress";
import ROOT_PATH from "../ROOT_PATH";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChangePassword = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError("");
    const form = new FormData();
    form.append("email", email);
    form.append("password", values.password);

    const res = await fetch(`${API_PATH}/login`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    console.log(res);
    if (!res.ok) {
      console.log(data);
      setIsLoading(false);
      setError(data.error);
    } else {
      console.log(data.token);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("isLogging", true);
      window.location = "/profile";
    }
  };

  return (
    <form
      className="login-form shadow-lg animate__animated animate__fadeInRight"
      onSubmit={handleLogin}
    >
      {isLoading && (
        <Box className="overflow-hidden w-100">
          <LinearProgress />
        </Box>
      )}

      <h4
        className={`text-center text-primary font-primary mt-4 ${
          isLoading && "opacity-50"
        }`}
      >
        تسجيل الدخول
      </h4>

      <div className={`mx-auto mb-3 p-4 ${isLoading && "opacity-50"}`}>
        <div className="w-75 my-2 mx-auto">
          <EmailInput isLoading={isLoading} email={email} setEmail={setEmail} />
        </div>
        <div className="w-75 my-2 mx-auto">
          <PasswordInput
            values={values}
            handleChangePassword={handleChangePassword}
            isLoading={isLoading}
          />
        </div>
        <div className="w-100 mx-auto">
          <ShowPasswordCheckBox values={values} setValues={setValues} />
        </div>
        {error && (
          <div className="error text-center">
            <span className="text-danger">{error}</span>
          </div>
        )}

        <div className="w-75 mt-2 text-center mx-auto">
          <Button
            className="font-primary fs-6 w-100"
            type="submit"
            variant="contained"
          >
            تسجيل دخول
          </Button>
        </div>
        
        <div className="mt-2 text-center">
          <NavLink
            className=" text-muted text-decoration-none"
            exact
            to={`${ROOT_PATH}/forgetpassword`}
            underline="none"
          >
            هل نسيت كلمة المرور؟
          </NavLink>
          <br />
        </div>
      </div>
    </form>
  );
}

const EmailInput = ({ isLoading, email, setEmail }) => {
  return (
    <>
      <label htmlFor="email">البريد الإلكتروني</label>
      <br />
      <TextField
        className="w-100 mt-2 mb-3"
        required
        id="email"
        placeholder="youssefwael@gmail.com"
        variant="standard"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading & true}
      />
    </>
  );
};

const PasswordInput = ({ values, handleChangePassword, isLoading }) => {
  return (
    <>
      <label htmlFor="password">كلمة المرور</label>
      <br />
      <TextField
        className="w-100 mt-2"
        required
        id="password"
        placeholder="***************"
        variant="standard"
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChangePassword("password")}
        disabled={isLoading & true}
      />
    </>
  );
};

const ShowPasswordCheckBox = ({ values, setValues }) => {
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <FormControlLabel
      className="mx-4 mb-2"
      control={
        <Checkbox
          checked={values.showPassword}
          onChange={handleClickShowPassword}
          name="showPassword"
        />
      }
      label="ظهور كلمة المرور"
    />
  );
};

export default LoginForm;
