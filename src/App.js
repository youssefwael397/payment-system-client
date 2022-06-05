import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { UserProvider } from "./components/UserProvider";
import { BranchesProvider } from "./components/BranchesProvider";
import { ManagersProvider } from "./components/ManagersProvider";
import { CategoriesProvider } from "./components/CategoriesProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className={`App container-xl  page-vh`}>
          <BranchesProvider>
            <ManagersProvider>
            <CategoriesProvider>
              <div className="h-100">
                <AppRoutes />
              </div>
            </CategoriesProvider>
            </ManagersProvider>
          </BranchesProvider>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
