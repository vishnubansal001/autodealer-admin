import React, { useEffect, useMemo, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Input, Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import toast from "react-hot-toast";
import { useAuthStore, useUnitsStore } from "../../store/masterStore";

const columns = [
  { name: "Vehicle ID", uid: "unitId" },
  { name: "Vehicle Name", uid: "unitName" },
  { name: "Vehicle Status", uid: "unitStatus" },
  { name: "Vehice Description", uid: "unitDescription" },
  { name: "Addition Date", uid: "additionDate" },
  { name: "Actions", uid: "actions" },
];

const Units = () => {
  const [isActionModalOpen, setActionModal] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { units, setUnits } = useUnitsStore((state) => state);
  const [form, setForm] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");

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
      const event = units.find((e) => e._id === id);
      setForm({
        ...event,
      });
    } else if (action === "delete") {
      const event = units.find((e) => e._id === id);
      setForm({
        ...event,
      });
    }
  };
  const handleActionsModalClose = () => {
    setActionModal({
      ...isActionModalOpen,
      isOpen: false,
      action: "",
    });
  };
  const {user} = useAuthStore((state) => state);
  useEffect(() => {
    setLoading(true);
    publicApi.get("/api/v1/unit",{
      headers: {
        Authorization: `Bearer ${user?.jwtToken}`,
      },
    })
      .then((res) => {
        // setUsers(res.data.users)
        console.log(res.data.units)
        setLoading(false)
      })
      .catch((error) => console.log(error.message))
  }, [reload]);

  const filteredData = units.filter(
    (unit: any) =>
      unit.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.additionDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.raiseDate.toString().includes(searchTerm.toLowerCase())
  );
  const data = useMemo(() => {
    return filteredData.map((e) => {
      return {
        ...e,
        unitId: e._id,
      };
    });
  }, [filteredData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      setLoading(true);
      try {
        publicApi.put(`/api/v1/unit/${form._id}`, form, {
          headers: {
            Authorization: `Bearer ${user?.jwtToken}`,
          },
        });
        toast.success("Updated Successfully!");
        e.currentTarget.reset();
        setReload(!reload);
        setActionModal({
          ...isActionModalOpen,
          isOpen: false,
          action: "",
        });
        setForm({});
      } catch (error: any) {
        toast.error(error.data.message);
      } finally {
        setLoading(false);
      }
    } else if (isActionModalOpen.action === "add") {
      e.preventDefault();
      setLoading(true);
      try {
        publicApi.post("/api/v1/unit", form,{
          headers: {
            Authorization: `Bearer ${user?.jwtToken}`,
          },
        });
        toast.success("Added Successfully!");
        setReload(!reload);
        e.currentTarget.reset();
        setActionModal({
          ...isActionModalOpen,
          isOpen: false,
          action: "",
        });
        setForm({});
      } catch (error: any) {
        toast.error(error.data.message);
      } finally {
        setLoading(false);
      }
    } else if (isActionModalOpen.action === "delete") {
      setLoading(true);
      publicApi
        .delete(`/api/v1/unit/${form.oranizationId}`,{
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
      case "unitId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "unitName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "unitDescription":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "raiseDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "additionDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Units">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "view",
                    id: user.unitId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaRegEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Units">
              <span
                onClick={() =>
                  handleActionsModal({ action: "edit", id: user.unitId })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Units">
              <span
                onClick={() =>
                  handleActionsModal({ action: "delete", id: user.unitId })
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
            <p className="font-medium text-4xl">Users Queries & Request</p>
            <div className="flex items-center justify-end md:justify-center gap-4">
              <button onClick={() => setReload(!reload)} type="button">
                <icon.SlRefresh className="w-5 h-5 hover:rotate-[180deg] transition-all" />
              </button>
              <button
                type="button"
                onClick={() => handleActionsModal({ action: "add" })}
                className="bg-[#fefefe] border border-[#dedede] px-10 py-2 rounded-md flex items-center justify-center gap-2"
              >
                Add
                <icon.CiCirclePlus className="w-4 h-4" />
              </button>
              <div className="rounded-md flex items-center justify-center gap-2">
                <Input
                  color="primary"
                  placeholder="Search vehicle"
                  className="w-[20rem]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full gap-4 flex-col">
            <TableContainer
              aria={"Events Table"}
              columns={columns}
              id={"eventId"}
              data={data}
              renderCell={renderCell}
            />
          </div>
        </div>
      </div>
      <ModalContainer
        heading={
          isActionModalOpen.action === "edit" ? "Edit Unit" : "Delete Unit"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={isActionModalOpen.action === "edit" ? "Edit Unit" : "Delete Unit"}
        formid={isActionModalOpen.action === "edit" ? "editunit" : "deleteunit"}
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        modalClass="text-mainBlack"
        enableFooter={true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this unit?
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Edit Units Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit" ? "editunit" : "deleteunit"
              }
              onSubmit={handleSubmit}
              className="flex items-center justify-center gap-4 flex-col"
            >
              <div className="flex items-center justify-center gap-4 w-full flex-col">
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdEventNote className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Vehicle Name"
                    name="unitName"
                    required
                    onChange={handleInputChange}
                    value={form.unitName || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdOutlineSell className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Unit Status"
                    name="unitStatus"
                    required
                    onChange={handleInputChange}
                    value={form.unitStatus || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.MdEventNote className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="text"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Unit Description"
                    name="unitDescription"
                    required
                    onChange={handleInputChange}
                    value={form.unitDescription || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.BsCalendar2Date className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="date"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Addition Date"
                    name="additionDate"
                    required
                    disabled
                    onChange={handleInputChange}
                    value={form.additionDate || ""}
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </ModalContainer>
    </DashboardContainer>
  );
};

export default Units;