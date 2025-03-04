import React from "react";
import {
  Box,
  VStack,
  Tooltip,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@redux/slices/user";

export default function Sidebar({ isExpanded }) {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const hoverColor = useColorModeValue("gray.200", "gray.700");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerHeight = "64px";

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <Box
      position="fixed"
      left={0}
      top={headerHeight}
      height={`calc(100vh - ${headerHeight})`}
      width={isExpanded ? "220px" : "60px"}
      bg={bgColor}
      display="flex"
      flexDirection="column"
      paddingY={3}
      boxShadow="lg"
      zIndex={1000}
      transition="width 0.3s ease-in-out"
    >
      <VStack spacing={2} align="stretch" width="100%">
        <SidebarItem
          to="/dashboard"
          onClick={() => navigate("/dashboard")}
          icon={FiHome}
          label="Dashboard"
          iconColor={iconColor}
          hoverColor={hoverColor}
          isExpanded={isExpanded}
        />
        <SidebarItem
          to="/profile"
          onClick={() => navigate("/profile")}
          icon={FiUser}
          label="Profile"
          iconColor={iconColor}
          hoverColor={hoverColor}
          isExpanded={isExpanded}
        />
        <SidebarItem
          to="/settings"
          onClick={() => navigate("/settings")}
          icon={FiSettings}
          label="Settings"
          iconColor={iconColor}
          hoverColor={hoverColor}
          isExpanded={isExpanded}
        />
        <SidebarItem
          onClick={handleLogout}
          icon={FiLogOut}
          label="Logout"
          iconColor="red.400"
          hoverColor={hoverColor}
          isExpanded={isExpanded}
        />
      </VStack>
    </Box>
  );
}

function SidebarItem({
  to,
  icon,
  label,
  iconColor,
  hoverColor,
  onClick,
  isExpanded,
}) {
  return (
    <Tooltip label={isExpanded ? "" : label} placement="right" hasArrow>
      <Box
        as="div"
        display="flex"
        alignItems="center"
        justifyContent={isExpanded ? "flex-start" : "center"}
        width="100%"
        paddingY={2}
        paddingX={isExpanded ? 4 : 0}
        _hover={{ bg: hoverColor }}
        onClick={onClick}
        cursor="pointer"
      >
        <IconButton
          icon={React.createElement(icon)}
          aria-label={label}
          fontSize="20px"
          color={iconColor}
          bg="transparent"
          _hover={{ bg: hoverColor }}
          marginRight={isExpanded ? 4 : 0}
        />
        {isExpanded && <Text>{label}</Text>}
      </Box>
    </Tooltip>
  );
}
