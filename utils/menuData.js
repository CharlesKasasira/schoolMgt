import { RxDashboard } from "react-icons/rx";
import {
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { HiOutlineCash } from "react-icons/hi";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineCalendarToday } from "react-icons/md";
import { AiOutlineInbox } from "react-icons/ai";

export const menuData = {
  system: [
    { label: "Dashboard", icon: <RxDashboard />, link: "/" },
    { label: "Logs", icon: <AiOutlineInbox />, link: "/logs" },
  ],
  admin: [
    { label: "Dashboard", icon: <RxDashboard />, link: "/" },
    { label: "Teachers", icon: <IoPersonOutline />, link: "/teachers" },
    { label: "Students", icon: <IoPeopleOutline />, link: "/students" },
    { label: "Settings", icon: <IoSettingsOutline />, link: "/settings" },
  ],
  teacher: [
    { label: "Dashboard", icon: <RxDashboard />, link: "/" },
    {
      label: "Attendance",
      icon: <MdOutlineCalendarToday />,
      link: "/attendance",
    },
  ],
  student: [
    { label: "Dashboard", icon: <RxDashboard />, link: "/" },
    { label: "Payments", icon: <HiOutlineCash />, link: "/payments" },
    { label: "Reports", icon: <TbReportSearch />, link: "/reports" },
    { label: "Bio Data", icon: <IoPersonOutline />, link: "/bio" },
  ],
};
