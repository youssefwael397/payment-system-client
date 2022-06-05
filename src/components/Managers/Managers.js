import React, { useContext } from 'react'
import { ManagersContext } from "./../ManagersProvider";


export default function Managers() {
  const { managers } = useContext(ManagersContext);
  return (
    <div className="">
      <p className="text-center">Managers</p>
      {
        managers.map(manager => (
          <>
            <h3>{manager.manager_name}</h3>
            <p>{manager.Branch.branch_name}</p>
          </>
        ))
      }
    </div>
  )
}
