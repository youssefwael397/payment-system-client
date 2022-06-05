import React from "react";
import { TextField } from "@mui/material";

const ConfirmPasswordInput = ({
  password,
  confirmPassword,
  setConfirmPassword,
}) => {
  let confirmPasswordValid = true;
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      confirmPasswordValid = false;
    }
  }
  return (
    <div
      className={`mb-3 col-md-6 col-xs-12 font-cairo ${
        !confirmPasswordValid && "text-danger"
      }`}
    >
      <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
      <TextField
        className="w-75 px-3"
        required
        id="confirmPassword"
        placeholder="***************"
        variant="standard"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
    </div>
  );
};

export default ConfirmPasswordInput;
