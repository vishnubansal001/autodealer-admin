import DashboardContainer from "../../components/containers/DashboardContainer";
import DashboardHomeCard from "../../components/pagesComponents/dashboardPage/DashboardHomeCard";
import { useAuthStore } from "../../store/masterStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="flex items-center justify-center w-full h-full flex-col gap-8">
          <div className="flex items-center justify-start w-full">
            <p className="text-mainBlack font-medium text-4xl">
              Welcome! {user?.name}
            </p>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-4">
              <DashboardHomeCard
                text={"Orders Created"}
                value={"01"}
                xClass={"bg-gradient-to-r from-cyan-400 to-blue-600 text-white"}
              />
              <DashboardHomeCard
                text={"Events Created"}
                value={"01"}
                xClass={"bg-gradient-to-r from-green-400 to-teal-500 text-white"}
              />
              <DashboardHomeCard
                text={"Events Solved"}
                value={"01"}
                xClass={"bg-gradient-to-r from-yellow-400 to-orange-500 text-white"}
              />
              <DashboardHomeCard
                text={"Users Signed Up"}
                value={"01"}
                xClass={"bg-gradient-to-r from-indigo-400 to-blue-400 text-white"}
              />
              <DashboardHomeCard
                text={"Vehicle Added"}
                value={"01"}
                xClass={"bg-gradient-to-r from-blue-400 to-cyan-500 text-white"}
              />
              <DashboardHomeCard
                text={"Vehicle Sold"}
                value={"01"}
                xClass={"bg-gradient-to-r from-red-400 to-red-600 text-white"}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Home;
