import React from "react";
import { TextField } from "@mui/material";

const NationalIdInput = ({ nationalId, setNationalId }) => {
  let validId = true;
  if(nationalId){
    const pattern = /^\d{14}$/;
    validId = pattern.test(nationalId)
  }
  return (
    <div className={`mb-4 col-md-6 col-xs-12 font-cairo ${!validId && "text-danger"}`}>
      <label htmlFor="nationalId">الرقم القومي</label>
      <TextField
        className="mx-3 w-75"
        required
        id="nationalId"
        placeholder="1234-5678-9101-12"
        variant="standard"
        name="nationalId"
        type="number"
        // InputProps={{ maxRows="14" }}
        value={nationalId}
        onChange={(e) => setNationalId(e.target.value)}
      />
    </div>
  );
};

export default NationalIdInput;
