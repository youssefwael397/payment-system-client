import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from "../ROOT_PATH";

export default function My404Component() {
  const { isLogging } = useContext(UserContext);
  const root_route = ROOT_PATH;
  return (
    <div className="page-vh">
      <div className="position-relative text-center mx-auto">
        <div className="page-vh" id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h1>
                4<span></span>4
              </h1>
            </div>
            <h2>صفحة غير موجودة</h2>
            <p>نأسف لعدم وجود صفحة بهذا الاسم.</p>
            <Link
              className="text-decoration-none"
              // exact
              to={isLogging ? `${root_route}/home` : `${root_route}/`}
            >
              الرجوع للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
