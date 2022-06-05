import React from "react";
import { TextField } from "@mui/material";

const EmailInput = ({ email, setEmail }) => {
  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor="email">البريد الإلكتروني</label>
      <TextField
        className="mx-3 w-75"
        required
        id="email"
        placeholder="youssefwael@gmail.com"
        variant="standard"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default EmailInput;
