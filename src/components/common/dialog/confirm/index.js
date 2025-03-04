import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons"; // Example icon

export default function PopupDialog({
  isOpen,
  onClose,
  title,
  icon = InfoIcon,
  description,
  onSubmit,
  iconColor = "teal.500",
  cancelButtonColor = "gray.600",
  confirmButtonColor = "red",
  children, // Accept children
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="2xl" p={5}>
        <ModalHeader display="flex" alignItems="center" gap={2}>
          <Icon as={icon} boxSize={8} color={iconColor} />
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3} width="100%">
            <Text fontSize="md" color="gray.600">
              {description}
            </Text>
            {children} {/* Render custom content */}
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="ghost"
            color={cancelButtonColor}
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button colorScheme={confirmButtonColor} onClick={onSubmit}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
