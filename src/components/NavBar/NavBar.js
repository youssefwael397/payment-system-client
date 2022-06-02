import React, { useState, useEffect, useContext } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";
import { UserContext } from "./../UserProvider";
import ROOT_PATH from "../ROOT_PATH.js";

const NavBar = () => {
  const root_route = ROOT_PATH;
  const { user, userInfo, isLogging, isBoss, isManager, isSales } =
    useContext(UserContext);
  const [navListItems, setNavListItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const setBossNav = () => {
    setNavListItems([
      {
        path: `${root_route}/managers`,
        title: "المديرون",
      },
      {
        path: `${root_route}/branches`,
        title: "الفروع",
        icon: <AdminPanelSettingsIcon className="mx-1" />,
      },
    ]);
  };

  const setManagerNav = () => {
    setNavListItems([
      {
        path: `${root_route}/categories`,
        title: "التصنيفات",
      },
      {
        path: `${root_route}/products`,
        title: "المنتجات",
      },
    ]);
  };

  const setSalesNav = () => {
    setNavListItems([
      {
        path: `${root_route}/clients`,
        title: "العملاء",
      },
      {
        path: `${root_route}/processes`,
        title: "العمليات",
      },
    ]);
  };

  const setNavItems = ({ isBoss, isManager, isSales, isLogging }) => {
    if (isLogging) {
      isBoss && setBossNav();
      isManager && setManagerNav();
      isSales && setSalesNav();
    }
  };

  useEffect(() => {
    const nav_data = {
      isBoss: isBoss,
      isManager: isManager,
      isSales: isSales,
      isLogging: isLogging,
    };
    setNavItems(nav_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBoss, isManager, isSales, isLogging]);

  return (
    <nav className="rtl navbar navbar-expand-lg  bg-spe-logo nav-shadow p-0 animate__animated animate__fadeInDown">
      <div className="container-xl">
        <NavLink
          className={`navbar-brand p-2 ${!isLogging && "mx-auto text-center"}`}
          // exact="true"
          to={`${isLogging ? `${root_route}/home` : `${root_route}/`}`}
        >
          {userInfo.Branch && (
            <img
              width="40px"
              src={`data:image/png;base64, ${userInfo.Branch.logo}`}
              alt="logo"
            />
          )}
          {(isBoss || !isLogging) && (
            <span className={`mx-2 fs-5 font-primary text-light`}>
              شعار الشركة
            </span>
          )}
        </NavLink>

        <button
          className={`navbar-toggler text-light ${!isLogging && "d-none"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="material-icons md-18">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>

        <div className="collapse navbar-collapse text-light" id="navbarNav">
          <ul className="navbar-nav mx-auto font-cairo">
            {isLogging && (
              <>
                <li className={`nav-item`}>
                  <NavLink className="nav-link p-3"  to="/profile">
                    الصفحة الشخصية
                  </NavLink>
                </li>
                <li className={`nav-item`}>
                  <NavLink className="nav-link p-3"  to="/home">
                    الصفحة الرئيسية
                  </NavLink>
                </li>
              </>
            )}

            {navListItems.map((item) => (
              <li className={`nav-item`} key={item.path}>
                <NavLink className="nav-link p-3"  to={item.path}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          {isLogging && (
            <NavLink
              className="nav-link logout me-auto p-3 text-muted font-cairo"
              // exact="true"
              to="/logout"
            >
              تسجيل الخروج
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
