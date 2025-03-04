import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataTable = ({ columns, data, renderActions, topRightElement }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Chakra UI theme-aware colors
  const headerBg = useColorModeValue("gray.200", "gray.700");
  const headerColor = useColorModeValue("gray.700", "gray.100");
  const tableBg = useColorModeValue("white", "gray.800");
  const boxShadowColor = useColorModeValue("lg", "dark-lg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box
        p={4}
        boxShadow={boxShadowColor}
        borderRadius="lg"
        bg={tableBg}
        overflow="hidden"
      >
        {/* Optional Top Right Element */}
        {topRightElement && (
          <Flex justifyContent="flex-end" mb={4}>
            <Box maxW="250px" w="full">
              {topRightElement}
            </Box>
          </Flex>
        )}

        <TableContainer>
          <Table variant="simple" size="md">
            <Thead>
              <Tr bg={headerBg}>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <Th key={header.id} color={headerColor} textAlign="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  ))
                )}
                {renderActions && (
                  <Th color={headerColor} textAlign="center">
                    Actions
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  as={motion.tr}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} textAlign="center" p={3}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  {renderActions && (
                    <Td textAlign="center">
                      <Box display="flex" justifyContent="center" gap={2}>
                        {renderActions(row.original)}
                      </Box>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </motion.div>
  );
};

export default DataTable;
