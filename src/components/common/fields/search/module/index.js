import { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  List,
  ListItem,
  Box,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModuleSearch({ p, pl, pr, pt, pb, px, py }) {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const modules = useSelector((state) => state.modules);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredModules, setFilteredModules] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredModules([]);
      return;
    }

    const allModules = Object.values(modules).flatMap((category) =>
      category.flatMap((group) =>
        group.modules.map((module) => ({
          title: group.title,
          label: module.label,
          path: module.path,
          query: module.query || {},
        }))
      )
    );

    // Filter based on input
    const results = allModules.filter(
      (mod) =>
        mod.label.toLowerCase().includes(term) ||
        mod.path.toLowerCase().includes(term)
    );

    setFilteredModules(results);
  };

  const handleNavigation = (path, query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    navigate(queryString ? `${path}?${queryString}` : path);
    setSearchTerm(""); // Clear search after selection
    setFilteredModules([]);
  };

  return (
    <Box
      position="relative"
      width="100%"
      p={p}
      pl={pl}
      pr={pr}
      pt={pt}
      pb={pb}
      px={px}
      py={py}
    >
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          placeholder="Search for modules..."
          value={searchTerm}
          onChange={handleSearch}
          bg={colorMode === "light" ? "gray.100" : "gray.800"}
          borderRadius="full"
        />
      </InputGroup>

      {/* Search Results */}
      {filteredModules.length > 0 && (
        <List
          position="absolute"
          mt={2}
          w="100%"
          bg={colorMode === "light" ? "white" : "gray.800"}
          borderRadius="md"
          boxShadow="md"
          maxH="250px"
          overflowY="auto"
          zIndex="10"
        >
          {filteredModules.map((mod, index) => (
            <ListItem
              key={index}
              p={3}
              borderBottom="1px solid"
              borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
              cursor="pointer"
              _hover={{ bg: colorMode === "light" ? "gray.100" : "gray.700" }}
              onClick={() => handleNavigation(mod.path, mod.query)}
            >
              <Link fontWeight="medium">{mod.label}</Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
