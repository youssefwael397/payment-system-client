import React from "react";
import AddBranchComponent from './../AddBranchComponent/AddBranchComponent';
import AddManagerComponent from './../AddManagerComponent/AddManagerComponent';


function BossHome() {
  return (
    <div>
      <AddBranchComponent />
      <AddManagerComponent />
    </div>
  );
}

export default BossHome;
