import React from "react";

import { TextField } from "@mui/material";

const NameInput = ({ name, setName, label, placeholder }) => {
  let validName = true;
  if (name) {
    const pattern = /^[أ-ي]{2,}\s[أ-ي]{2,}\s[أ-ي]{2,}$/;
    validName = pattern.test(name);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validName && "text-danger"
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
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default NameInput;
