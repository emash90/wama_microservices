import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconLogout,
  IconHome2,
  IconUsers,
  IconReportMoney,
  IconMoneybag,
  IconCashBanknote
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Pages",
  },
  {
    id: uniqueId(),
    title: "Houses",
    icon: IconHome2,
    href: "/houses",
  },
  {
    id: uniqueId(),
    title: "Tenants",
    icon: IconUsers,
    href: "/tenants",
  },
  {
    id: uniqueId(),
    title: "Payments",
    icon: IconCashBanknote,
    href: "/payments",
  },
  {
    id: uniqueId(),
    title: "Reports",
    icon: IconReportMoney,
    href: "/reports",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Logout",
    icon: IconLogout,
    href: "/authentication/login",
  },
];

export default Menuitems;
