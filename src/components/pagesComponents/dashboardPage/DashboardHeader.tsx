import React from "react";
import logo from "../../../assets/logo-black.svg";
import { IoHomeOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import DashboardLinks from "../../minorComponents/DashboardLinks";
import { useAuthStore } from "../../../store/masterStore";
import toast from "react-hot-toast";
import { MdOutlineContactPhone } from "react-icons/md";

const DashboardHeader = () => {
  const { clearUser } = useAuthStore(state => state)

  return (
    <header className="md:static fixed bottom-0 flex items-start justify-start w-full md:min-h-[100dvh] md:h-full bg-[#fefefe] z-10 border-r border-[#dfdede]">
      <nav className="flex items-center justify-center w-full h-full md:min-h-[100dvh]">
        <div className="flex items-center justify-center w-full h-full md:min-h-[100dvh]">
          <div className="flex items-center justify-center w-full md:min-h-[100dvh] flex-col gap-4 p-2">
            <div className="items-center md:flex hidden justify-center w-full h-full">
              <img src={logo} alt="" className="flex w-auto h-[6rem] object-contain" />
            </div>
            <div className="flex items-start justify-start w-full flex-row md:flex-col gap-3 p-4 h-full flex-1">
              <DashboardLinks
                text={"Home"}
                icon={<IoHomeOutline className="w-6 h-6" />}
                link={"/dashboard/home"}
              />
              <DashboardLinks
                text={"Users"}
                icon={<FiUsers className="w-6 h-6" />}
                link={"/dashboard/users"}
              />
              <DashboardLinks
                text={"Orders"}
                icon={<MdOutlineMenuBook className="w-6 h-6" />}
                link={"/dashboard/orders"}
              />
              <DashboardLinks
                text={"Events"}
                icon={<MdOutlineContactPhone className="w-6 h-6" />}
                link={"/dashboard/events"}
              />
              <DashboardLinks
                text={"Units"}
                icon={<FaCar className="w-6 h-6" />}
                link={"/dashboard/units"}
              />
            </div>
            <div className="flex items-center justify-center w-full">
              <button onClick={() => {
                clearUser()
                toast.success("Logged out!")
              }} className="text-base font-semibold flex items-center justify-center gap-2 text-red-600">
                <span className="lg:flex hidden">Logout</span>
                <IoMdLogOut className="-rotate-90 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
