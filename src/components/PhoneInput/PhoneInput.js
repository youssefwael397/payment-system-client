import React from "react";
import { TextField } from "@mui/material";

const PhoneInput = ({ phone, setPhone }) => {
  let validPhone = true;
  if (phone) {
    const pattern = /^01[0-9]{9}$/;
    validPhone = pattern.test(phone);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validPhone && "text-danger"
      }`}
    >
      <label htmlFor="phone">رقم الهاتف</label>
      <TextField
        className="mx-3 w-75"
        required
        id="phone"
        placeholder="01010932484"
        variant="standard"
        min="11"
        max="11"
        name="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
};
export default PhoneInput;
