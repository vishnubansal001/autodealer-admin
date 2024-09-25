import React, { useEffect, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Input, Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import { useAuthStore, useOrdersStore } from "../../store/masterStore";
import toast from "react-hot-toast";

const columns = [
  { name: "Order ID", uid: "orderId" },
  { name: "User Name", uid: "name" },
  { name: "Email", uid: "email" },
  { name: "Country", uid: "country" },
  { name: "Mobile No.", uid: "phone" },
  { name: "Location", uid: "location" },
  { name: "Actions", uid: "actions" },
];

const Orders = () => {
  const [isActionModalOpen, setActionModal] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthStore((state) => state);
  // @ts-ignore
  const { orders, setOrders } = useOrdersStore((state) => state);
  useEffect(() => {
    setLoading(true);
    publicApi
      .get("/api/v1/order", {
        headers: {
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [reload]);

  const filteredData = orders.filter(
    (order: any) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toString().includes(searchTerm.toLowerCase())
  );

  const data = React.useMemo(() => {
    return filteredData.map((e: any) => ({
      ...e,
      orderId: e._id,
    }));
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
      const order = data.find((e: any) => e.orderId === id);
      setForm({
        ...order,
      });
    } else if (action === "delete") {
      const order = data.find((e: any) => e.orderId === id);
      setForm({
        ...order,
      });
    } else if (action === "view") {
      const order = data.find((e: any) => e.orderId === id);
      console.log(order);
      setForm({
        ...order,
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
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      setLoading(true);
      try {
        publicApi.put(`/api/v1/order/${form.orderId}`, form, {
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
        .delete(`/api/v1/order/${form.orderId}`)
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
      case "orderId":
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
      case "country":
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
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Order">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "view",
                    id: user.orderId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaRegEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Order">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "edit",
                    id: user.orderId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Order">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "delete",
                    id: user.orderId,
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
            <p className="font-medium text-4xl">Purchase Contracts</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button onClick={() => setReload(!reload)} type="button">
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <div className="rounded-md flex items-center justify-center gap-2">
                <Input
                  color="primary"
                  placeholder="Search orders"
                  className="w-[20rem]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Orders Table"}
              columns={columns}
              id={"_id"}
              data={data}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit"
            ? "Edit Order"
            : isActionModalOpen.action === "view"
            ? "View Order"
            : "Delete Order"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit"
            ? "Edit Order"
            : isActionModalOpen.action === "view"
            ? "View Order"
            : "Delete Order"
        }
        formid={isActionModalOpen.action === "edit" ? "editorder" : ""}
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        modalClass="text-mainBlack"
        enableFooter={isActionModalOpen.action === "view" ? false : true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this Order?
            </p>
          </div>
        ) : isActionModalOpen.action === "edit" ? (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Edit Order Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit"
                  ? "editorder"
                  : "deleteorder"
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
                    <icon.CiGlobe className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Country"
                    name="country"
                    required
                    onChange={handleInputChange}
                    value={form.country || ""}
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
                    name="phone"
                    required
                    onChange={handleInputChange}
                    value={form.phone || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.CiLocationOn className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Location"
                    name="location"
                    required
                    onChange={handleInputChange}
                    value={form.location || ""}
                  />
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-2 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Order Details"}
              </h1>
              {Object.entries(form).map(([key, value]) => {
                if (["__v", "_id", "createdAt", "updatedAt"].includes(key))
                  return null;

                if (key === "unitId" && value && typeof value === "object") {
                  return (
                    <div key={key} className="w-full py-2">
                      <h2 className="text-lg font-semibold mb-2 capitalize">
                        Unit Details
                      </h2>
                      {renderDetails(value)}
                    </div>
                  );
                }
                return (
                  <div
                    key={key}
                    className="flex justify-between w-full capitalize"
                  >
                    <span className="font-medium text-sm">{key}</span>
                    <span className="text-xs font-normal truncate lowercase">
                      {value as React.ReactNode}
                    </span>
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
const renderDetails = (data: any) => {
  return Object.entries(data).map(([key, value]) => {
    if (["__v", "_id", "createdAt", "updatedAt", "unitDetails"].includes(key))
      return null;
    if (value && typeof value === "object") {
      return (
        <div key={key} className="w-full py-2 flex gap-2">
          <h3 className="text-md font-semibold mb-2 capitalize">
            {key} Details
          </h3>
          <div className="">{renderDetails(value)}</div>{" "}
        </div>
      );
    }
    return (
      <div
        key={key}
        className="flex justify-between w-full capitalize gap-6 mt-2"
      >
        <span className="font-medium text-sm">{key}</span>
        <span className="text-xs font-normal truncate lowercase">
          {value as React.ReactNode}
        </span>
      </div>
    );
  });
};
export default Orders;
