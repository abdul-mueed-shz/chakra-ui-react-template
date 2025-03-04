import React, { useState } from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  useColorModeValue,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

export default function ScrollableSections({ sections }) {
  const cardBg = useColorModeValue("white", "gray.900");
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const [sectionIndex, setSectionIndex] = useState(0);
  const navigate = useNavigate();

  const nextSection = () => {
    setSectionIndex((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setSectionIndex((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const handleModuleClick = (item) => {
    if (!!item.path) {
      navigate(`${item.path}?${queryString.stringify(item.query ?? "")}`)
    }
  }

  return (
    <Box
      p={6}
      maxW="1000px"
      mx="auto"
      height="85vh"
      display="flex"
      flexDirection="column"
    >
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: sectionIndex === index ? 1 : 0,
            y: sectionIndex === index ? 0 : 10,
          }}
          transition={{ duration: 0.4 }}
          style={{ display: sectionIndex === index ? "block" : "none" }}
        >
          {/* Styled Section Header with Navigation */}
          <Flex justify="space-between" align="center" py={4} mb={2}>
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Previous Section"
              variant="ghost"
              size="lg"
              onClick={prevSection}
              _hover={{ bg: "blue.500", color: "white" }}
            />
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
              letterSpacing="wide"
              position="relative"
              _after={{
                content: '""',
                display: "block",
                width: "60px",
                height: "3px",
                background: "blue.400",
                margin: "6px auto 0",
                borderRadius: "2px",
                transition: "width 0.3s",
              }}
              _hover={{
                _after: {
                  width: "90px",
                },
              }}
            >
              {section.title}
            </Text>
            <IconButton
              icon={<ChevronRightIcon />}
              aria-label="Next Section"
              variant="ghost"
              size="lg"
              onClick={nextSection}
              _hover={{ bg: "blue.500", color: "white" }}
            />
          </Flex>

          {/* Scrollable Modules */}
          <Box overflowY="auto" flex="1" p={2} maxH="65vh">
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              {section.modules.map((item, idx) => (
                <GridItem key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      onClick={() => handleModuleClick(item)}
                      bg={cardBg}
                      border="1px solid"
                      borderColor={borderColor}
                      boxShadow="lg"
                      borderRadius="2xl"
                      transition="0.3s"
                      _hover={{
                        bg: cardHoverBg,
                        boxShadow: "xl",
                      }}
                    >
                      <CardBody textAlign="center" py={6}>
                        <Text fontWeight="bold" fontSize="lg" color={textColor}>
                          {item.label ?? "N/A"}
                        </Text>
                      </CardBody>
                    </Card>
                  </motion.div>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}
