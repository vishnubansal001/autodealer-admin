import React, { useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import { useAuthStore } from "../../store/masterStore";
import { publicApi } from "../../utils/app.utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let { user, setUser } = useAuthStore((state) => state);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  console.log(user);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    publicApi
      .post("/api/v1/user/login", form)
      .then((res) => {
        setUser(res.data.user);
        toast.success("Profile Updated, 👋🏻");
        e.currentTarget.reset();
        return navigate("/dashboard/home");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-full h-full px-2 flex-col">
          <div className="w-full h-28 border lg:flex hidden border-[#dfdede] bg-[#fefefe]"></div>
          <div className="flex w-full lg:max-w-3xl items-center justify-center lg:mt-[-4.25rem]  gap-2 flex-col bg-[#f9f9f9] border border-[#f2eeee] py-4 px-4 lg:p-4 rounded-md">
            <div className="flex items-center justify-center w-full flex-col">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm font-normal text-mainBlack">
                  My Profile
                </h3>
                <label className="py-1 px-4 bg-[#fefefe] border-[#e6e6e6] border text-mainBlack rounded-md">
                  <p className="text-xs font-normal">Upload Image</p>
                  <input
                    hidden
                    type="file"
                    multiple={false}
                    id="img"
                    name="img"
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="flex items-center justify-center p-2">
                <img
                  src={user?.img}
                  alt=""
                  className="w-[4.25rem] h-[4.25rem] rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full text-mainBlack flex-col px-6 py-4 md:py-3 lg:py-4  bg-[#fefefe] border-[#dfdede] rounded-sm gap-2">
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Name
                </label>
                <input
                  type="text"
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-mainBlack border border-[#e6e6e6] rounded-[8px] focus:outline-none"
                  placeholder="Your name"
                  name="name"
                  onChange={handleInputChange}
                  value={form.name || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Age
                </label>
                <input
                  type="number"
                  className="flex outline:none bg-transparent text-sm w-full pl-3 pr-3 py-3 text-mainBlack border border-[#e6e6e6] rounded-[8px] focus:outline-none"
                  placeholder="Your Age"
                  name="age"
                  onChange={handleInputChange}
                  value={form.age || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-mainBlack border border-[#e6e6e6] rounded-[8px] focus:outline-none"
                  placeholder="Your Phone Number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                  value={form.phoneNumber || ""}
                  required
                />
              </div>
              <div className="flex items-center justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full items-center justify-start">
                  Gender
                </label>
                <select
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-mainBlack border border-[#e6e6e6] rounded-[8px] focus:outline-none"
                  name="gender"
                  onChange={handleInputChange}
                  value={form.gender || ""}
                  required
                >
                  <option value="" disabled>
                    Select a gender
                  </option>
                  <option className="text-black" value="Male">
                    Male
                  </option>
                  <option className="text-black" value="Female">
                    Female
                  </option>
                  <option className="text-black" value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="flex items-start justify-center w-full md:flex-row flex-col gap-2">
                <label className="flex w-full pt-2 items-center justify-start">
                  Bio
                </label>

                <textarea
                  rows={2}       
                  maxLength={250}
                  className="flex bg-transparent text-sm w-full pl-3 pr-3 py-3 text-mainBlack border border-[#e6e6e6] rounded-[8px] focus:outline-none"
                  placeholder="Your Bio"
                  name="bio"
                  onChange={handleInputChange}
                  value={form.bio || ""}
                  required
                />
              </div>
              <div className="flex items-center w-full justify-end">
                <button
                  type="submit"
                  className="flex items-center text-xs justify-center bg-mainBlue text-white font-semibold px-6 rounded-md py-2 md:py-1 lg:py-2 border-2 border-transparent hover:border-2 hover:border-[#FFC947] hover:text-[#FFC947] hover:bg-transparent transition-all duration-500"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Profile;
