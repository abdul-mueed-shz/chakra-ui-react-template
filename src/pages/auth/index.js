import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Login from "@components/auth/login";
import Signup from "@components/auth/signup";
import ThemeToggler from "@components/theme/index";
import { FaEnvelope, FaEllipsisV } from "react-icons/fa";
import { MoonIcon } from "@chakra-ui/icons";
import { AUTH_ROUTES, MAIN_ROUTES } from "@utils/routes";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
    const { toggleColorMode } = useColorMode();
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Detect screen size

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(MAIN_ROUTES.DASHBOARD.PATH, { replace: true });
    }
  }, [navigate]);

  const navigateToVerifyEmail = () => {
    navigate(AUTH_ROUTES.VERIFY_EMAIL.PATH)
  }

  return (
    <Flex direction="column" height="100vh">
      {/* Desktop Icons */}
      {!isMobile && (
        <Flex
          position="absolute"
          top={4}
          right={4}
          gap={4}
          align="center"
          zIndex={10}
        >
          <Tooltip label="Verify Email">
            <IconButton
              icon={<FaEnvelope />}
              variant="ghost"
              aria-label="Verify Email"
              onClick={navigateToVerifyEmail}
            />
          </Tooltip>
          <ThemeToggler />
        </Flex>
      )}

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            aria-label="Menu"
            size="lg"
            position="fixed"
            bottom={6}
            right={6}
            borderRadius="full"
            boxShadow="lg"
            zIndex={1000}
          />
          <MenuList minWidth="auto" p={1}>
            <MenuItem p={2} display="flex" justifyContent="center" onClick={navigateToVerifyEmail}>
              <Tooltip label="Verify Email" placement="left">
                <FaEnvelope />
              </Tooltip>
            </MenuItem>
            <MenuItem p={2} display="flex" justifyContent="center" onClick={toggleColorMode}>
              <Tooltip label="Toggle Theme" placement="left">
                <MoonIcon />
              </Tooltip>
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {/* Content (Form remains centered) */}
      <Flex flex="1" align="center" justify="center">
        <Box textAlign="center">
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Signup setIsLogin={setIsLogin} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
