import NonAuthorizedRoutes from "./NonAuthorizedRoutes";
import AuthorizedRoutes from "./AuthorizedRoutes";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenStorage } from "../utils/auth.util";

function Routes() {
  const navigate = useNavigate();
  const accessToken = getTokenStorage();

  useEffect(() => {
    !accessToken && navigate("/sign-in");
  }, [accessToken, navigate]);

  return (
    <>
      {!accessToken ? (
        <NonAuthorizedRoutes />
      ) : (
        <AuthorizedRoutes isAuthenticated={!!accessToken} />
      )}
    </>
  );
}
export default Routes;
