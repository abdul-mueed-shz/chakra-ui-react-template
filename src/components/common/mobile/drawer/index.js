import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Box,
  Text,
  IconButton,
  Divider,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FiHome, FiUser, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@redux/slices/user"; // Import logout action

export default function MobileDrawer({ isOpen, onClose }) {
  const bgColor = useColorModeValue("white", "gray.900");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } finally {
      navigate("/", { replace: true });
      onClose(); // Close drawer after logout
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        bg={bgColor}
        boxShadow="2xl"
        borderTopRightRadius="xl"
        borderBottomRightRadius="xl"
        paddingTop="20px"
      >
        {/* Custom Close Button */}
        <Flex justify="flex-end" pr={4}>
          <IconButton
            aria-label="Close drawer"
            icon={<FiX />}
            size="lg"
            borderRadius="full"
            bg="gray.100"
            _hover={{ bg: "gray.300" }}
            onClick={onClose}
          />
        </Flex>

        {/* Drawer Items */}
        <VStack spacing={2} align="stretch" p={6}>
          <MobileDrawerItem
            label="Dashboard"
            icon={FiHome}
            onClick={() => navigate("/dashboard")}
            onClose={onClose}
          />
          <MobileDrawerItem
            label="Profile"
            icon={FiUser}
            onClick={() => navigate("/profile")}
            onClose={onClose}
          />
          <MobileDrawerItem
            label="Settings"
            icon={FiSettings}
            onClick={() => navigate("/settings")}
            onClose={onClose}
          />

          {/* Divider for separation */}
          <Divider borderColor="gray.400" />

          <MobileDrawerItem
            label="Logout"
            icon={FiLogOut}
            onClick={handleLogout}
            onClose={onClose}
            color="red.400"
          />
        </VStack>
      </DrawerContent>
    </Drawer>
  );
}

function MobileDrawerItem({ label, icon, onClick, onClose, color }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={3}
      borderRadius="lg"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
      onClick={() => {
        onClick();
        onClose();
      }}
    >
      <IconButton
        icon={React.createElement(icon)}
        fontSize="22px"
        bg="transparent"
        color={color || "gray.700"}
      />
      <Text
        ml={4}
        fontWeight="medium"
        fontSize="lg"
        color={color || "gray.700"}
      >
        {label}
      </Text>
    </Box>
  );
}
