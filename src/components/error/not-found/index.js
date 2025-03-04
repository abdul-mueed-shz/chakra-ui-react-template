import React from "react";
import { Box, Heading, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons"; // Chakra UI Icon
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      px={6}
    >
      <VStack spacing={6}>
        <Icon as={WarningTwoIcon} boxSize="100px" color="red.400" />
        <Heading color="gray.700" fontSize="4xl">
          Oops! Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.500">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button as={Link} to="/" colorScheme="blue" size="lg" px={6}>
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
}

export default NotFound;
