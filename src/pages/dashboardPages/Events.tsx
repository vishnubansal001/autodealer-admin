import React, { useEffect, useMemo, useState } from "react";
import DashboardContainer from "../../components/containers/DashboardContainer";
import TableContainer from "../../components/containers/TableContainer";
import ModalContainer from "../../components/containers/ModalContainer";
import { Input, Tooltip } from "@nextui-org/react";
import icon from "../../components/svgExporter";
import { publicApi } from "../../utils/app.utils";
import toast from "react-hot-toast";
import { useAuthStore, useEventsStore } from "../../store/masterStore";

const columns = [
  { name: "Event ID", uid: "eventId" },
  { name: "Event Type", uid: "eventType" },
  { name: "User Name", uid: "name" },
  { name: "Raise Date", uid: "raiseDate" },
  { name: "Close Date", uid: "closeDate" },
  { name: "Actions", uid: "actions" },
];

const Events = () => {
  const [isActionModalOpen, setActionModal] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const { events, setEvents } = useEventsStore((state) => state);
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
      const event = events.find((e) => e._id === id);
      setForm({
        ...event,
      });
    } else if (action === "delete") {
      const event = events.find((e) => e._id === id);
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
  const { user } = useAuthStore((state) => state);
  useEffect(() => {
    setLoading(true);
    publicApi
      .get("/api/v1/event", {
        headers: {
          Authorization: `Bearer ${user?.jwtToken}`,
        },
      })
      .then((res) => {
        // setEvents(res.data.data);
        console.log(res.data.events);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, [reload]);

  const filteredData = events.filter(
    (event: any) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.raiseDate.toString().includes(searchTerm.toLowerCase())
  );

  const data = useMemo(() => {
    return filteredData.map((e) => {
      return {
        ...e,
        eventId: e._id,
      };
    });
  }, [filteredData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isActionModalOpen.action === "edit") {
      e.preventDefault();
      setLoading(true);
      try {
        publicApi.put(`/api/v1/event/${form._id}`, form, {
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
    } else if (isActionModalOpen.action === "delete") {
      setLoading(true);
      publicApi
        .delete(`/api/v1/event/${form.oranizationId}`, {
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
      case "eventId":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "eventType":
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
      case "raiseDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "closeDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Event">
              <span
                onClick={() =>
                  handleActionsModal({
                    action: "view",
                    id: user.eventId,
                  })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaRegEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit Event">
              <span
                onClick={() =>
                  handleActionsModal({ action: "edit", id: user.eventId })
                }
                className="text-lg cursor-pointer active:opacity-50"
              >
                <icon.FaEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Event">
              <span
                onClick={() =>
                  handleActionsModal({ action: "delete", id: user.eventId })
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
              <div className="rounded-md flex items-center justify-center gap-2">
                <Input
                  color="primary"
                  placeholder="Search queries"
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
          isActionModalOpen.action === "edit" ? "Edit Events" : "Delete Events"
        }
        isOpen={isActionModalOpen.isOpen}
        onClose={handleActionsModalClose}
        cta={
          isActionModalOpen.action === "edit" ? "Edit Event" : "Delete Event"
        }
        formid={
          isActionModalOpen.action === "edit" ? "editevents" : "deleteevents"
        }
        onSubmit={handleSubmit}
        ctaClass={isActionModalOpen.action === "delete" ? "danger" : "primary"}
        modalClass="text-mainBlack"
        enableFooter={true}
      >
        {isActionModalOpen.action === "delete" ? (
          <div className="w-full flex items-center justify-center">
            <p className="p-2 text-center flex items-center justify-center font-bold">
              Are you sure you want to delete this event?
            </p>
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-center gap-1 flex-col py-2">
              <h1 className="capitalize text-sm font-medium">
                {"Edit Event Details"}
              </h1>
              <p className="capitalize text-xs text-[#b3b3b3]">
                *all fields are required!
              </p>
            </div>
            <form
              id={
                isActionModalOpen.action === "edit"
                  ? "editevents"
                  : "deleteevents"
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
                    placeholder="Event Type"
                    name="eventType"
                    required
                    onChange={handleInputChange}
                    value={form.eventType || ""}
                  />
                </div>
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
                    <icon.BsCalendar2Date className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="date"
                    className="flex bg-transparent text-sm w-full pl-10 pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Raise Date"
                    name="raiseDate"
                    required
                    onChange={handleInputChange}
                    value={form.raiseDate || ""}
                  />
                </div>
                <div className="relative flex items-center justify-center gap-2 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <icon.BsCalendarDateFill className="w-6 h-6 text-[#808080]" />
                  </div>
                  <input
                    type="date"
                    className="flex bg-transparent text-sm w-full pl-10 fill-white pr-3 py-3 text-mainBlack border border-[#252525] rounded-[8px] focus:outline-none"
                    placeholder="Event Close Date"
                    name="closeDate"
                    required
                    onChange={handleInputChange}
                    value={form.closeDate || ""}
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

export default Events;