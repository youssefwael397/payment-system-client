import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../UserProvider";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";
import NameInput from "./../NameInput/NameInput";
import EmailInput from "./../EmailInput/EmailInput";
import PasswordInput from "./../PasswordInput/PasswordInput";
import ConfirmPasswordInput from "./../ConfirmPasswordInput/ConfirmPasswordInput";
import PhoneInput from "./../PhoneInput/PhoneInput";
import AddImage from "./../AddImage/AddImage";
import NationalIdInput from "./../NationalIdInput/NationalIdInput";
import FacebookLinkInput from "./../FacebookLinkInput/FacebookLinkInput";

function AddSalesComponent() {
  const { token, user, userInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [salesName, setSalesName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [nationalId, setNationalId] = useState();
  const [phone, setPhone] = useState();
  const [facebookLink, setFacebookLink] = useState();
  const [salesImg, setSalesImg] = useState();
  const [salesFID, setSalesFID] = useState();
  const [salesBID, setSalesBID] = useState();

  const AddSalesSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");

    let form = new FormData();
    form.append("branch_id", userInfo.branch_id);
    form.append("manager_id", user.id);
    form.append("sales_name", salesName);
    form.append("email", email);
    form.append("password", password);
    form.append("national_id", nationalId);
    form.append("phone", phone);
    form.append("facebook_link", facebookLink);
    form.append("sales_img", salesImg);
    form.append("manager_face_national_id_img", salesFID);
    form.append("manager_back_national_id_img", salesBID);

    const url = `${API_PATH}/sales/create`;
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
    const success = `تم إضافة ${data.sales_name} `;
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
      <h4 className="mb-5">إضافة مندوب</h4>
      <div className="row">
        <NameInput
          name={salesName}
          setName={setSalesName}
          label="اسم المندوب"
          placeholder="محمد منير ماهر"
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
          image={salesImg}
          setImage={setSalesImg}
        />
        <AddImage
          inputLabel={`صورة ظهر البطاقة`}
          image={salesFID}
          setImage={setSalesFID}
        />
        <AddImage
          inputLabel={`صورة المدير`}
          image={salesBID}
          setImage={setSalesBID}
        />

        <SubmitButton submitLabel="إضافة" />

        {success && <p className="text-center text-success">{success}</p>}
        {err && <p className="text-center text-danger">{err}</p>}
        {isLoading && <LoadingSpinner />}
      </div>
    </form>
  );
}

export default AddSalesComponent;
