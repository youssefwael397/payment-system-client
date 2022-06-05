import React from "react";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const AddImage = ({ inputLabel, image, setImage }) => {
  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label className="text-dark" htmlFor={inputLabel}>
        <IconButton
          className="mx-auto text-center"
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <span className="text-center fs-6 ms-2">
            {image ? image.name : `${inputLabel}`}
          </span>
          <PhotoCamera />
        </IconButton>
      </label>

      <input
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        id={inputLabel}
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddImage;
