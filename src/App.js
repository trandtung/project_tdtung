import React from "react";
import Routes from "./routes/Routes";
import { ProSidebarProvider } from "react-pro-sidebar";

function App() {
  return (
    <div className="wrapper">
      <ProSidebarProvider>
        <Routes />
      </ProSidebarProvider>
    </div>
  );
}
export default App;
