import React from "react";
import { TextField } from "@mui/material";

const PasswordInput = ({ password, setPassword }) => {
  let passwordValid = true;
  if (password) {
    const pattern = /^\S{8,}$/;
    passwordValid = pattern.test(password);
  }
  return (
    <div
      className={`mb-3 col-md-6 col-xs-12 font-cairo ${
        !passwordValid && "text-danger"
      }`}
    >
      <label htmlFor="password">كلمة المرور</label>
      <TextField
        className="w-75 px-3"
        required
        id="password"
        placeholder="***************"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
  );
};

export default PasswordInput;
