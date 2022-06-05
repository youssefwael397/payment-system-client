import React, { useContext, useEffect } from "react";
import { UserContext } from "./../UserProvider";
import LoginForm from "./../LoginForm/LoginForm";

function Login() {
  const { isLogging } = useContext(UserContext);
  useEffect(() => {
    if (isLogging) {
      window.location = `/profile`;
    }
  });

  return (
    <div className="row page-vh">
      {/* right side */}
      <div className="col-md-6 col-xs-12 mx-auto d-flex align-items-center justify-content-center align-self-center">
        <LoginForm />
      </div>
      <div className="bg-login-img col-md-6 col-xs-12 mx-auto d-flex align-items-center justify-content-center align-self-center animate__animated animate__fadeInLeft">
        <img
          className="w-100 align-self-center "
          src={`${process.env.PUBLIC_URL}/images/login-bg.png`}
          alt="background"
        />
      </div>
    </div>
  );
}

export default Login;
