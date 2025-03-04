import React from "react";
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { MAIN_ROUTES } from "@utils/routes";

export default function NavMenu() {
  const navLinks = Object.values(MAIN_ROUTES).filter(
    (route) => route.NAV.HEADER
  );

  return (
    <Flex gap={5} align="center">
      {/* Desktop Navigation */}
      <Flex gap={5} display={{ base: "none", md: "flex" }}>
        {navLinks.map((route) => (
          <Link
            as={NavLink}
            key={route.PATH}
            to={route.PATH}
            fontWeight="medium"
          >
            {route.SHORT_TITLE}
          </Link>
        ))}
      </Flex>

      {/* Mobile Menu */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FaEllipsisV />}
          display={{ base: "flex", md: "none" }} // Only show on small screens
          aria-label="Open menu"
          variant="ghost"
        />
        <MenuList>
          {navLinks.map((route) => (
            <MenuItem as={NavLink} key={route.PATH} to={route.PATH}>
              {route.TITLE}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
