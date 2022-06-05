import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../UserProvider";
import { BranchesContext } from "./../BranchesProvider";

import {
  TextField,
  IconButton,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

function AddManagerComponent() {
  const { token } = useContext(UserContext);
  const { branches } = useContext(BranchesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [branchId, setBranchId] = useState();
  const [managerName, setManagerName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nationalId, setNationalId] = useState();
  const [phone, setPhone] = useState();
  const [facebookLink, setFacebookLink] = useState();
  const [managerImg, setManagerImg] = useState();
  const [managerFID, setManagerFID] = useState();
  const [managerBID, setManagerBID] = useState();

  const AddManagerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    let form = new FormData();
    form.append("branch_id", branchId);
    form.append("manager_name", managerName);
    form.append("email", email);
    form.append("password", password);
    form.append("national_id", nationalId);
    form.append("phone", phone);
    form.append("facebook_link", facebookLink);
    form.append("manager_img", managerImg);
    form.append("manager_face_national_id_img", managerFID);
    form.append("manager_back_national_id_img", managerBID);

    const url = `${API_PATH}/manager/create`;
    const res = await fetch(url, {
      method: "POST",
      body: form,
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    const success = `تم إضافة ${data.manager_name} `;
    return setSuccess(success);
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
      onSubmit={(e) => AddManagerSubmit(e)}
    >
      <h4 className="mb-5">إضافة مدير</h4>
      <div className="row">
        <NameInput managerName={managerName} setManagerName={setManagerName} />
        <BranchSelectInput
          branches={branches}
          branchId={branchId}
          setBranchId={setBranchId}
        />
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <ConfirmPasswordInput
          password={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <PhoneInput phone={phone} setPhone={setPhone} />
        <NationalIdInput
          nationalId={nationalId}
          setNationalId={setNationalId}
        />
        <FacebookLinkInput
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
        />
        <AddImage
          inputLabel={`صورة وجه البطاقة`}
          image={managerImg}
          setImage={setManagerImg}
        />
        <AddImage
          inputLabel={`صورة ظهر البطاقة`}
          image={managerFID}
          setImage={setManagerFID}
        />
        <AddImage
          inputLabel={`صورة المدير`}
          image={managerBID}
          setImage={setManagerBID}
        />

        <SubmitButton submitLabel="إضافة" />

        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
}

const NameInput = ({ managerName, setManagerName }) => {
  let validName = true;
  if (managerName) {
    const pattern = /^[أ-ي]{2,}\s[أ-ي]{2,}\s[أ-ي]{2,}$/;
    validName = pattern.test(managerName);
  }
  return (
    <div
      className={`mb-4 col-md-6 col-xs-12 font-cairo ${
        !validName && "text-danger"
      }`}
    >
      <label htmlFor="managerName">اسم المدير</label>
      {/* <br /> */}
      <TextField
        className="mx-3"
        required
        id="managerName"
        placeholder=" يوسف وائل السيد"
        variant="standard"
        name="text"
        type="text"
        value={managerName}
        onChange={(e) => setManagerName(e.target.value)}
      />
    </div>
  );
};

const BranchSelectInput = ({ branches, branchId, setBranchId }) => {
  const handleChange = (event) => {
    setBranchId(event.target.value);
  };

  return (
    <div className="mb-4 col-md-6 col-xs-12 font-cairo">
      <label htmlFor="branchSelectOption">الفرع</label>
      {/* <br /> */}
      <FormControl className="mx-3 w-50 " variant="standard">
        <Select
          label="الفرع"
          id="branchSelectOption"
          value={branchId}
          onChange={handleChange}
        >
          {branches.map((branch) => (
            <MenuItem value={branch.branch_id}>{branch.branch_name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

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

const PasswordInput = ({ password, setPassword }) => {
  let passwordValid = true;
  if (password) {
    const pattern = /^\S{8,}$/;
    passwordValid = pattern.test(password);
  }
  return (
    <div
      className={`mb-3 col-md-6 col-xs-12 font-cairo ${
        !passwordValid && "text-danger"
      }`}
    >
      <label htmlFor="password">كلمة المرور</label>
      <TextField
        className="w-75 px-3"
        required
        id="password"
        placeholder="***************"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
  );
};

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

const NationalIdInput = ({ nationalId, setNationalId }) => {
  return (
    <div className={`mb-4 col-md-6 col-xs-12 font-cairo `}>
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

export default AddManagerComponent;
