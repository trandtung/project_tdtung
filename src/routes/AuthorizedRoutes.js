import Home from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";

function AuthorizedRoutes({ isAuthenticated = true }) {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : null}>
        <Route path="/profile" element={<div>profileddd</div>} />
        {/* <Route path="*" element={<div>error</div>} /> */}
      </Route>
      {/* <Route path="*" element={<div>error</div>} /> */}
    </Routes>
  );
}
export default AuthorizedRoutes;
