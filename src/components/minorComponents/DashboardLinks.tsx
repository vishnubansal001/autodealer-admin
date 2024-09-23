import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const DashboardLinks = ({ icon, link, text }:{icon:ReactNode,link:string,text:string}) => {
  return (
    <NavLink
      to={link}
      style={({ isActive }) => ({
        color: isActive ? "#2B44E7" : "black",
        fontWeight: isActive ? "semibold" : "medium",
        transition: "all 0.5s ease-in-out",
      })}
      className="flex items-center justify-center lg:justify-start w-full p-2 md:p-4"
    >
      <div className="text-lg flex items-center justify-center gap-2">
        {icon}
        <p className="lg:flex hidden">{text}</p>
      </div>
    </NavLink>
  );
};

export default DashboardLinks;
