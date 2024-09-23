import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
const DashboardNav = ({ img }: { img: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full px-2 border-b border-[#dedede]">
      <nav className="flex items-center justify-center w-full p-2">
        <div className="flex items-center w-full justify-between p-2">
          <div className="flex text-mainBlack">
            <p className="font-bold uppercase">{location.pathname.split("/")[2]}</p>
          </div>
          <button className="flex" onClick={() => navigate("/")}>
            <img
              src={img}
              alt="avatar"
              className="flex w-8 h-8 object-cover rounded-full"
            />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;
