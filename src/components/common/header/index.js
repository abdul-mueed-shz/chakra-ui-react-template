import React from "react";
import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import ModuleSearch from "@components/common/fields/search/module";
import NavMenu from "@components/common/nav/menu";

export default function Header({ onToggleSidebar }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={8}
      py={3}
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
      boxShadow="sm"
      bg={colorMode === "light" ? "white" : "gray.900"}
    >
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        variant="ghost"
      />
      <ModuleSearch pl="7" />
      <NavMenu />
      <IconButton
        ml="2"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        aria-label="Toggle theme"
        variant="ghost"
      />
    </Flex>
  );
}
