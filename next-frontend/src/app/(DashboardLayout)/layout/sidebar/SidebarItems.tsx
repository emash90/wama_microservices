"use client"; // Required to use hooks in Next.js App Router

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, List } from "@mui/material";
import Menuitems from "./MenuItems";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const pathDirect = pathname;
  
  return (
    <Box sx={{ px: "20px" }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems(router.push).map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={(e) => {
                  if (item.onClick) {
                    item.onClick();
                  }
                  toggleMobileSidebar(e);
                }}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
