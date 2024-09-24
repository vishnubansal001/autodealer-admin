import { Routes, Route } from "react-router-dom";
import Login from "./dashboardPages/Login";
import Home from "./dashboardPages/Home";
import Events from "./dashboardPages/Events";
import Profile from "./dashboardPages/Profile";
import Users from "./dashboardPages/Users";
import Orders from "./dashboardPages/Orders";
import Units from "./dashboardPages/Units";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/home" element={<Home />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/events" element={<Events />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/units" element={<Units />} />
        {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}

export default App;
