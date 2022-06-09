import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./../UserProvider";
import EmailInput from "./../EmailInput/EmailInput";
import NameInput from "./../NameInput/NameInput";
import API_PATH from "../API_PATH";
import SubmitButton from "./../SubmitButton/SubmitButton";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

function EditBossProfile() {
  const { userInfo, token } = useContext(UserContext);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [name, setName] = useState(userInfo && userInfo.boss_name);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handelEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    setSuccess("");
    let form = new FormData();
    form.append("email", email);
    form.append("boss_name", name);

    const url = `${API_PATH}/boss/update`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: form,
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) return setErr(data.error);
    window.location.reload();
  };

  return (
    <form
      onSubmit={handelEditSubmit}
      className={`${isLoading && "opacity-50"}`}
    >
      <NameInput
        name={name}
        setName={setName}
        label="الاسم"
        placeholder={"يوسف وائل السيد"}
      />
      <EmailInput email={email} setEmail={setEmail} />
      <SubmitButton submitLabel="تعديل" />
      {success && <p className="text-center text-success">{success}</p>}
      {err && <p className="text-center text-danger">{err}</p>}
      {isLoading && <LoadingSpinner />}
    </form>
  );
}

export default EditBossProfile;
