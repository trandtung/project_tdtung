import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Auth";

function NonAuthorizedRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="sign-in" element={<Login />} />
      </Route>
    </Routes>
  );
}
export default NonAuthorizedRoutes;
