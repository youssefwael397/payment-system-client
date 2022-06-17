import React from "react";

import {
    Button
  } from "@mui/material";



function SubmitButton({submitLabel}) {
  return (
    <div className="mb-2 col-md-6 col-xs-12 font-cairo">
      <Button
        className="font-primary fs-6 w-100"
        type="submit"
        variant="contained"
      >
        {submitLabel}
      </Button>
    </div>
  );
}

export default SubmitButton;
