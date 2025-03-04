import React, { useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "@components/common/header";
import Sidebar from "@components/common/drawer";
import Breadcrumbs from "@components/breadcrumbs";
import MobileDrawer from "@components/common/mobile/drawer";

export default function Layout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

  const toggleSidebar = () => setIsSidebarExpanded((prev) => !prev);

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <Header onToggleSidebar={toggleSidebar} />

      <Box display="flex" flex="1" overflow="hidden">
        {isLargeScreen && <Sidebar isExpanded={isSidebarExpanded} />}
        {!isLargeScreen && (
          <MobileDrawer isOpen={isSidebarExpanded} onClose={toggleSidebar} />
        )}
        <Box
          as="main"
          p={{ base: 4, md: 8 }}
          flex="1"
          ml={isLargeScreen ? (isSidebarExpanded ? "220px" : "60px") : "0"}
          transition="margin-left 0.3s ease-in-out"
          height="calc(100vh - 64px)"
          overflowY="auto"
        >
          <Box mb={6}>
            <Breadcrumbs />
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
