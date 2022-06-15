import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { UserProvider } from "./components/UserProvider";
import { BranchesProvider } from "./components/BranchesProvider";
import { ManagersProvider } from "./components/ManagersProvider";
import { CategoriesProvider } from "./components/CategoriesProvider";
import { SalesProvider } from "./components/SalesProvider";
import { ClientsProvider } from "./components/ClientsProvider";
import { ProductsProvider } from "./components/ProductsProvider";
import { ProcessesProvider } from "./components/ProcessesProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className={`App container-xl  page-vh`}>
          <BranchesProvider>
            <ManagersProvider>
              <CategoriesProvider>
                <SalesProvider>
                  <ClientsProvider>
                    <ProductsProvider>
                    <ProcessesProvider>
                      <div className="h-100">
                        <AppRoutes />
                      </div>
                    </ProcessesProvider>
                    </ProductsProvider>
                  </ClientsProvider>
                </SalesProvider>
              </CategoriesProvider>
            </ManagersProvider>
          </BranchesProvider>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
