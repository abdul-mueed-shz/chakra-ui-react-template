import React from "react";
import { Box, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import SectionCard from "../../components/common/cards/module"; // Import the reusable component

// Section Data with Icons
const sections = [
  {
    id: 1,
    title: "Sales",
    description: "Manage and view all sales records.",
    route: "/sales",
    iconName: "FaChartLine",
  },
  {
    id: 2,
    title: "Bank",
    description: "View and manage banking information.",
    route: "/finance",
    iconName: "FaUniversity",
  },
  {
    id: 3,
    title: "Accounts",
    description: "Track and manage finance.",
    route: "/accounts",
    iconName: "FaFileInvoiceDollar",
  },
  {
    id: 4,
    title: "HR",
    description: "View and manage employees.",
    route: "/hr",
    iconName: "FaUsers",
  },
];

export default function HomePage() {
  return (
    <Box p={6}>
      {/* Modern Styled Heading */}
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-r, blue.500, purple.500)"
        bgClip="text"
        letterSpacing="wide"
        position="relative"
        _after={{
          content: '""',
          display: "block",
          width: "80px",
          height: "4px",
          background: "blue.400",
          margin: "8px auto 0",
          borderRadius: "2px",
          transition: "width 0.3s",
        }}
        _hover={{
          _after: {
            width: "120px", // Expanding effect on hover
          },
        }}
      >
        Explore Our Modules
      </Text>

      <Flex justify="center" mt={6}>
        <Box maxWidth="900px" width="100%">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}
