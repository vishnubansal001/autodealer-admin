import React, { useEffect, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Input, Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import { useAuthStore, useUsersStore } from "../../store/masterStore";
import toast from "react-hot-toast";

const columns = [
  { name: "User ID", uid: "userId" },
  { name: "User Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Mobile No.", uid: "phone" },
  { name: "Actions", uid: "actions" },
];

const Users = () => {
  const [isActionModalOpen, setActionModal] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  let { user } = useAuthStore((state) => state);
  // @ts-ignore
  const { users, setUsers } = useUsersStore((state) => state);
  useEffect(() => {
    setLoading(true);
    publicApi
      .get("/api/v1/users", {
        headers: {
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [reload]);

  const filteredData = users?.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toString().includes(searchTerm.toLowerCase())
  );

  const data = React.useMemo(() => {
    return filteredData?.map((e: any) => {
      return {
        ...e,
        userId: e._id,
      };
    });
  }, [filteredData]);

  const handleActionsModal = ({
    action,
    id = null,
  }: {
    action: string;
    id?: string | null;
  }) => {
    setActionModal({
      ...isActionModalOpen,
      action: action,
      isOpen: true,
    });
    if (action === "edit") {
      const users = data.find((e: any) => e.userId === id);
      setForm({
        ...users,
      });
    } else if (action === "delete") {
      const users = data.find((e: any) => e.userId === id);
      setForm({
        ...users,
      });
    } else if (action === "view") {
      const users = data.find((e: any) => e.userId === id);
      setForm({
        ...users,
      });
    }
  };

  const handleActionsModalClose = () => {
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
    setForm({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("hi");
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      setLoading(true);
      try {
        publicApi.put(`/api/v1/users/${form.userId}`, form, {
          headers: {
            Authorization: `Bearer ${user?.jwtToken}`,
          },
        });
        toast.success("Updated");
        e.currentTarget.reset();
        setReload(!reload);
        setActionModal({
          ...isActionModalOpen,
          isOpen: false,
          action: "",
        });
        setForm({});
      } catch (error: any) {
        // Handle errors here, if needed
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else if (isActionModalOpen.action === "delete") {
      setLoading(true);
      publicApi
        .delete(`/api/v1/users/${form.userId}`, {
          headers: {
            Authorization: `Bearer ${user?.jwtToken}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          setReload(!reload);
          setActionModal({
            ...isActionModalOpen,
            isOpen: false,
            action: "",
          });
          setForm({});
        })
        .catch((error) => toast.error(error.data.message))
        .finally(() => setLoading(false));
    }
  };

  const handleInputChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const renderCell = React.useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "userId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View User">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "view",
                    id: user.userId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaRegEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit User">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "edit",
                    id: user.userId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete User">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "delete",
                    id: user.userId,
                  })
                }
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <icon.MdOutlineDelete />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <DashboardContainer>
      <div className="flex items-center justify-center w-full h-full px-2">
        <div className="flex items-center justify-center w-full h-full flex-col gap-8">
          <div className="flex items-end md:items-center justify-between text-mainBlack w-full md:flex-row flex-col gap-4">
            <p className="font-medium text-4xl">Users Data</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button onClick={() => setReload(!reload)} type="button">
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <div className="rounded-md flex items-center justify-center gap-2">
                <Input
                  color="primary"
                  placeholder="Search Users"
                  className="w-[20rem]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Users Table"}
              columns={columns}
              id={"userId"}
              data={data}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit"
            ? "Edit User"
            : isActionModalOpen.action === "view"
            ? "View User"
            : "Delete User"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit"
            ? "Edit User"
            : isActionModalOpen.action === "view"
            ? "View User"
            : "Delete User"
        }
        formid={
          isActionModalOpen.action === "edit"
            ? "edituser"
            : isActionModalOpen.action === "view"
            ? ""
            : ""
        }
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        modalClass="text-mainBlack"
        enableFooter={isActionModalOpen.action === "view" ? false : true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this User?
            </p>
          </div>
        ) : isActionModalOpen.action === "edit" ? (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Edit User Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit" ? "edituser" : "deleteuser"
              }
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-4 flex-col"
            >
              <div className="flex text-mainBlack items-center justify-center gap-4 w-full flex-col">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.FiUsers className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="User Name"
                    name="name"
                    onChange={handleInputChange}
                    value={form.name || ""}
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdOutlineMailOutline className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={form.email || ""}
                    required
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.CiMobile3 className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Mobile No."
                    name="mobile"
                    required
                    onChange={handleInputChange}
                    value={form.phone || ""}
                  />
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-2 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"User Details"}
              </h1>
              {Object.entries(form).map(([key, value]) => {
                if (["password","__v","_id", "role"].includes(key)) return null; // Skip the password field

                return (
                  <div
                    key={key}
                    className="flex justify-between w-full max-w-xs capitalize"
                  >
                    <span className="font-medium text-sm">{key}</span>
                    {key === "img" ? (
                      
                      <img
                      // @ts-ignore
                        src={value}
                        alt="User Image"
                        className="rounded-full w-12 h-12"
                      />
                    ) : (
                      // @ts-ignore
                      <span className="text-xs font-normal truncate lowercase">{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </ModalContainer>
    </DashboardContainer>
  );
};

export default Users;
