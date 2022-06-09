import React, { useContext, useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { UserContext } from "./../UserProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import NameInput from "./../NameInput/NameInput";
import PhoneInput from "./../PhoneInput/PhoneInput";
import AddImage from "./../AddImage/AddImage";
import NationalIdInput from "./../NationalIdInput/NationalIdInput";
import FacebookLinkInput from "./../FacebookLinkInput/FacebookLinkInput";

function AddClientComponent() {
  const { token, user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [clientName, setClientName] = useState();
  const [nationalId, setNationalId] = useState();
  const [phone, setPhone] = useState();
  const [work, setWork] = useState();
  const [workAddress, setWorkAddress] = useState();
  const [homeAddress, setHomeAddress] = useState();
  const [facebookLink, setFacebookLink] = useState();
  const [clientFID, setClientFID] = useState();
  const [clientBID, setClientBID] = useState();

  const AddSalesSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    let form = new FormData();
    form.append("sales_id", user.id);
    form.append("client_name", clientName);
    form.append("national_id", nationalId);
    form.append("phone", phone);
    form.append("work", work);
    form.append("work_address", workAddress);
    form.append("home_address", homeAddress);
    form.append("facebook_link", facebookLink);
    form.append("client_face_national_id_img", clientFID);
    form.append("client_back_national_id_img", clientBID);

    const url = `${API_PATH}/client/create`;
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
    const success = `تم إضافة ${data.client_name} `;
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
      onSubmit={(e) => AddSalesSubmit(e)}
    >
      <h4 className="mb-5">إضافة عميل</h4>
      <div className="row">
        <NameInput
          name={clientName}
          setName={setClientName}
          label="اسم العميل"
          placeholder="عبدالرحمن سمير السيد"
        />
        <PhoneInput phone={phone} setPhone={setPhone} />
        <NationalIdInput
          nationalId={nationalId}
          setNationalId={setNationalId}
        />
        <WorkInput
          name={work}
          setName={setWork}
          label="الوظيفة"
          placeholder="أمين شرطة"
        />
        <WorkInput
          name={workAddress}
          setName={setWorkAddress}
          label="عنوان الوظيفة"
          placeholder="قسم السويس"
        />
        <WorkInput
          name={homeAddress}
          setName={setHomeAddress}
          label="عنوان المنزل"
          placeholder="تعاونيات البحر الأحمر"
        />
        <FacebookLinkInput
          facebookLink={facebookLink}
          setFacebookLink={setFacebookLink}
        />
        <AddImage
          inputLabel={`صورة وجه البطاقة`}
          image={clientFID}
          setImage={setClientFID}
        />
        <AddImage
          inputLabel={`صورة ظهر البطاقة`}
          image={clientBID}
          setImage={setClientBID}
        />

        <SubmitButton submitLabel="إضافة" />

        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
}

const WorkInput = ({ name, setName, label, placeholder }) => {
  let validName = true;

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

export default AddClientComponent;
