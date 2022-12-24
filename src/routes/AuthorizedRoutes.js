import Home from "../pages/Home/Home";
import HomePage from "../layouts/MenuItem/HomePage/HomePage";
import Predict from "../layouts/MenuItem/Predict/Predict";
import ClientTable from "../layouts/MenuItem/ClientTable/ClientTable";
import Account from "../layouts/MenuItem/Account/Account";
import { Route, Routes } from "react-router-dom";
import TestScreen from "../layouts/MenuItem/Test/TestScreen";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthorizedRoutes({ isAuthenticated = true }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : null}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/clients" element={<ClientTable />} />
        <Route path="/clients/:id" element={<ClientTable />} />
        <Route path="/account" element={<Account />} />
        <Route path="/test" element={<TestScreen />} />
        {/* <Route path="*" element={<div>error</div>} /> */}
      </Route>
      {/* <Route path="*" element={<div>error</div>} /> */}
    </Routes>
  );
}
export default AuthorizedRoutes;
