import React, { useContext } from "react";
import { UserContext } from "./../UserProvider";
import BossHome from "./../BossHome/BossHome";
import ManagerHome from "./../ManagerHome/ManagerHome";
import SalesHome from "./../SalesHome/SalesHome";

export default function Home() {
  const { isBoss, isManager, isSales } = useContext(UserContext);
  return (
    <div className="container page-vh">
      {isBoss ? <BossHome /> : null}
      {isManager ? <ManagerHome /> : null}
      {isSales ? <SalesHome /> : null}
    </div>
  );
}
