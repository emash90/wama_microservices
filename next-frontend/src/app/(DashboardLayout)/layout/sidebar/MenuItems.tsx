import { logoutUser } from "@/services/authService";
import handleNavigation from "@/utils/handleNavigation";
import {
  IconLayoutDashboard,
  IconHome2,
  IconUsers,
  IconCashBanknote,
  IconReportMoney,
  IconLogout,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

interface MenuItem {
  id?: string;
  title?: string;
  icon?: React.ElementType;
  href?: string;
  navlabel?: boolean;
  subheader?: string;
  onClick?: () => void;
}

const Menuitems = (navigate: (path: string) => void): MenuItem[] => [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    onClick: () => handleNavigation(navigate, "/"),
  },
  {
    navlabel: true,
    subheader: "Pages",
  },
  {
    id: uniqueId(),
    title: "Houses",
    icon: IconHome2,
    onClick: () => handleNavigation(navigate, "/houses"),
  },
  {
    id: uniqueId(),
    title: "Tenants",
    icon: IconUsers,
    onClick: () => handleNavigation(navigate, "/tenants"),
  },
  {
    id: uniqueId(),
    title: "Payments",
    icon: IconCashBanknote,
    onClick: () => handleNavigation(navigate, "/payments"),
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconReportMoney,
    onClick: () => handleNavigation(navigate, "/reports"),
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    onClick: logoutUser,
  },
];

export default Menuitems;
