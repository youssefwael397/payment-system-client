import React from "react";
import { TextField } from "@mui/material";

const FacebookLinkInput = ({ facebookLink, setFacebookLink }) => {
  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor="facebook">رابط الفيسبوك</label>
      <TextField
        className="mx-3 w-75"
        required
        id="facebook"
        placeholder="https://www.facebook.com/profile.php?id=100013882777343"
        variant="standard"
        name="facebook"
        type="url"
        value={facebookLink}
        onChange={(e) => setFacebookLink(e.target.value)}
      />
    </div>
  );
};

export default FacebookLinkInput;
