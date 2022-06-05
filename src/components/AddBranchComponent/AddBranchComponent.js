import React, { useState, useContext, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleApiWrapper from "./../GoogleApiWrapper/GoogleApiWrapper";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UserContext } from "./../UserProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import { Button, TextField, IconButton } from "@mui/material";

const AddBranchComponent = () => {
  const { token } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [branchName, setBranchName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const AddBranchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");
    if (!image) {
      setIsLoading(false);
      return setErr("يجب إدخال شعار للفرع");
    }
    let form = new FormData();

    form.append("branch_name", branchName);
    form.append("branch_address", location);
    form.append("logo", image);

    const res = await fetch(`${API_PATH}/branch/create`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    return setSuccess(`تم إضافة فرع ${data.branch_name} بنجاح`);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [success]);

  return (
    <form
      className={` w-100 bg-white my-4 rounded shadow-lg p-4 ${
        isLoading && "opacity-50"
      } position-relative`}
      onSubmit={(e) => AddBranchSubmit(e)}
    >
      <h4 className="mb-5">إضافة فرع</h4>
      <div className="row">
        <AddName branchName={branchName} setBranchName={setBranchName} />
        <AddLocation location={location} setLocation={setLocation} />
        <AddLogo image={image} setImage={setImage} />
        <SubmitButton submitLabel="إضافة" />
        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
};

const AddName = ({ branchName, setBranchName }) => {
  let nameValid = true;
  if (branchName) {
    const pattern = /[^a-z]/i;
    nameValid = pattern.test(branchName);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !nameValid && "text-danger"
      }`}
    >
      <label htmlFor="branchName">اسم الفرع</label>
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        id="branchName"
        placeholder="السويس"
        variant="standard"
        name="email"
        type="text"
        value={branchName}
        onChange={(e) => setBranchName(e.target.value)}
      />
    </div>
  );
};

const AddLocation = ({ location, setLocation }) => {
  const [value, setValue] = React.useState("manual");
  let locationValid = true;

  if (location) {
    const pattern = /[^a-z]/i;
    locationValid = pattern.test(location);
  }

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !locationValid && "text-danger"
      }`}
    >
      {/* <LocationRadioInput value={value} handleChange={handleChange} /> */}
      <label htmlFor="location">عنوان الفرع</label>
      {value === "manual" ? (
        <LocationTextInput location={location} setLocation={setLocation} />
      ) : (
        <GoogleApiWrapper />
      )}
    </div>
  );
};

const LocationRadioInput = ({ value, handleChange }) => {
  return (
    <div className="d-flex align-items-center">
      <label htmlFor="location">عنوان الفرع</label>
      <RadioGroup
        row
        id="location"
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="manual" control={<Radio />} label="يدوي" />
        <FormControlLabel
          value="gmaps"
          control={<Radio />}
          label="خرائط جوجل"
        />
      </RadioGroup>
    </div>
  );
};

const LocationTextInput = ({ location, setLocation }) => {
  return (
    <TextField
      className="mx-3 font-cairo"
      required
      id="location"
      placeholder="شارع الجيش "
      variant="standard"
      name="email"
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  );
};

const AddLogo = ({ image, setImage }) => {
  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label className="text-dark" htmlFor="icon-button-file">
        <IconButton
          className="mx-auto text-center"
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <span className="text-center fs-6 ms-2">
            {image ? image.name : " شعار الفرع"}
          </span>
          <PhotoCamera />
        </IconButton>
      </label>

      <input
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
      />
    </div>
  );
};

const AddBranchButton = () => {
  return (
    <div className="rounded-pill  col-md-6 col-xs-12">
      <Button type="submit" variant="outlined">
        Create
      </Button>
    </div>
  );
};

export default AddBranchComponent;
