import React from "react";
import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function ThemeToggler() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} // ✅ Use JSX
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle theme"
    />
  );
}
