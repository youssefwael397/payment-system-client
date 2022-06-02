import React, { useState, useEffect, useContext } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleApiWrapper from './../GoogleApiWrapper/GoogleApiWrapper';
// import { Upload, message, Button } from 'antd';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { UserContext } from "./../UserProvider";
import { UploadOutlined } from '@ant-design/icons';
import API_PATH from "../API_PATH";
import {
  Button,
  TextField,
  IconButton,
} from "@mui/material";


function BossHome() {
  return <AddBranch />;
}

const AddBranch = () => {
  const { token } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [branchName, setBranchName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState('')

  const AddBranchSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    setErr('')
    setSuccess('')
    if (!image) {
      setIsLoading(false)
      return setErr('يجب إدخال شعار للفرع')
    }
    let form = new FormData();
    
    form.append('branch_name', branchName)
    form.append('branch_address', location)
    form.append('logo', image)
    
    const res = await fetch(`${API_PATH}/branch/create`, {
      method:'POST',
      body: form,
      headers:{
        Authorization: token
      }
    })
    const data = await res.json();
    setIsLoading(false)
    if(!res.ok) return setErr(data.error)
    return setSuccess(`تم إضافة فرع ${data.branch_name} بنجاح`)

    // setSuccess('تم اضافة فرع جديد')

  }

  return (
    <form className={`container w-100 bg-white my-4 rounded shadow-lg p-4 ${isLoading && 'opacity-50'} position-relative`} onSubmit={(e) => AddBranchSubmit(e)}>
      <h4 className="mb-5">إضافة فرع</h4>
      <div className="row">
        <AddName branchName={branchName} setBranchName={setBranchName} />
        <AddLocation location={location} setLocation={setLocation} />
        <AddLogo image={image} setImage={setImage} />
        <AddBranchButton />
        {
          success && <p className="text-center text-success">{success}</p>
        }
        {
          err && <p className="text-center text-danger">{err}</p>
        }

        {
          isLoading &&
          <div className="position-absolute top-50 start-50 translate-middle mx-auto text-center">
            <div class="spinner-border text-center mx-auto" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        }

      </div>
    </form >
  );
};

const AddName = ({ branchName, setBranchName, isLoading }) => {

  return (
    <div className="mb-4 col-md-6 col-xs-12">
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
        disabled={isLoading & true}
      />
    </div>
  )
}


const AddLocation = ({ location, setLocation }) => {
  const [value, setValue] = React.useState("manual");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="mb-4 col-md-6 col-xs-12">
      {/* <LocationRadioInput value={value} handleChange={handleChange} /> */}
      <label htmlFor="location">عنوان الفرع</label>
      {
        value === 'manual' ? <LocationTextInput location={location} setLocation={setLocation}  /> : <GoogleApiWrapper />
      }

    </div>
  )
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
        <FormControlLabel value="gmaps" control={<Radio />} label="خرائط جوجل" />
      </RadioGroup>
    </div>
  );
};

const LocationTextInput = ({ location, setLocation }) => {
  return (
    <TextField
      className="mx-3"
      required
      id="location"
      placeholder="شارع الجيش "
      variant="standard"
      name="email"
      type="text"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  )
}

const AddLogo = ({ image, setImage }) => {

  return (
    <div className="mb-4 col-md-6 col-xs-12">
      <label
        className="text-dark"
        htmlFor="icon-button-file"
      >
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
  )
}


const AddBranchButton = () => {
  return (
    <div className="rounded-pill  col-md-6 col-xs-12">
      <Button
        type="submit"
        variant="outlined"
      >
        Create
      </Button>
    </div>
  )
}

export default BossHome;
