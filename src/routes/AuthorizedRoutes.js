import Home from "../pages/Home/Home";
import Predict from "../layouts/MenuItem/Predict/Predict";
import ClientTable from "../layouts/MenuItem/ClientTable/ClientTable";
import { Route, Routes } from "react-router-dom";

function AuthorizedRoutes({ isAuthenticated = true }) {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : null}>
        <Route path="/profile" element={<div>profileddd</div>} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/clients" element={<ClientTable />} />
        <Route path="/clients/:id" element={<ClientTable />} />
        {/* <Route path="*" element={<div>error</div>} /> */}
      </Route>
      {/* <Route path="*" element={<div>error</div>} /> */}
    </Routes>
  );
}
export default AuthorizedRoutes;
