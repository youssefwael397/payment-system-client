import React, { useEffect, useContext } from "react";
import { UserContext } from "./../UserProvider";
export default function Logout() {
  const { userInfo, isBoss, isManager, isSales } = useContext(UserContext);
  useEffect(() => {
    window.localStorage.clear();
    window.location = `/`;
  }, []);

  return (
    <div className="text-center container my-5">
      <h3 className="text-primary">
        Great Job
        {isBoss && <p>{userInfo.boss_name}</p>}
        {isManager && <p>{userInfo.manager_name}</p>}
        {isSales && <p>{userInfo.sales_name}</p>}
      </h3>
    </div>
  );
}
