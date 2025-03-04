import React from "react";
import { Box, Text, Icon, VStack, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa"; // FontAwesome icons
import * as MdIcons from "react-icons/md"; // Material Design icons

const SectionCard = ({ title, route, iconName }) => {
  const navigate = useNavigate();

  // Dynamically fetch the icon component
  const IconComponent =
    FaIcons[iconName] || MdIcons[iconName] || FaIcons.FaInfoCircle; // Fallback icon

  // UI Styling
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("blue.500", "blue.300");
  const hoverBg = useColorModeValue("blue.100", "blue.700");

  return (
    <Box
      as="button"
      width="100%" // Full width for responsiveness inside grid
      minH="180px" // Consistent height
      p={6}
      borderRadius="lg"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
      onClick={() => navigate(route)}
    >
      {IconComponent && (
        <Icon as={IconComponent} boxSize={10} color={iconColor} />
      )}
      <VStack spacing={2} mt={3}>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export default SectionCard;
