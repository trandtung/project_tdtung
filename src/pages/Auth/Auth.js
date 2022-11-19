import "./Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Register from "./Register/Register";
import Signin from "./Login/Signin";

export default function Login() {
  const [authMode, setAuthMode] = useState(true);
  const changeAuthMode = () => setAuthMode(!authMode);

  if (authMode) {
    return <Signin changeAuthMode={changeAuthMode} />;
  }
  return <Register changeAuthMode={changeAuthMode} />;
}
