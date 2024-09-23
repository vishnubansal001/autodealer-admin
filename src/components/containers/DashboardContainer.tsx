import React, { useEffect } from "react";
import DashboardHeader from "../pagesComponents/dashboardPage/DashboardHeader";
import DashboardNav from "../pagesComponents/dashboardPage/DashboardNav";
import { useAuthStore } from "../../store/masterStore";
import { useNavigate } from "react-router";

const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore(state => state.user)
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     return navigate("/");
  //   }
  // }, [user, navigate])
  return (
    <main className="flex items-start justify-start w-full min-h-[100dvh] h-full">
      <div className="flex items-center justify-center  w-full min-h-[100dvh] md:py-0 pb-[8rem]">
        <div className="flex items-start justify-start w-full min-h-[100dvh] md:flex-row flex-col-reverse">
          <div className="flex items-center justify-center w-full h-full md:w-[15%] lg:w-[25%] xl:w-[15%]">
            <DashboardHeader />
          </div>
          <div className="flex items-start justify-start w-full min-h-[100dvh] md:w-[85%] lg:w-[75%] xl:w-[85%] flex-col">
            <DashboardNav img={user?.img || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} />
            <div className="flex items-center justify-center w-full h-full p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContainer;
