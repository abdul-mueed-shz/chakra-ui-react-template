import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react";

const ViewDialog = ({ isOpen, onClose, title, imageSrc }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          <Image src={imageSrc} alt={title} boxSize="200px" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewDialog;
