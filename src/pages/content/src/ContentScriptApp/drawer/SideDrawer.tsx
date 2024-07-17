// SideDrawer.tsx
import React from "react";
import { Box, VStack, Text, CloseButton } from "@chakra-ui/react";

interface PermanentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PermanentDrawer: React.FC<PermanentDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Box
      position="fixed"
      right={isOpen ? "0" : "-350px"} // Adjust left property for transition
      top={0}
      bottom={0}
      width="250px"
      zIndex={9999}
      bg="gray.900"
      color="white"
      transition="right 0.3s" // Add transition for smooth opening/closing
      aria-hidden={!isOpen} // Accessibility improvement
    >
      <VStack spacing={4} align="stretch" p={4}>
        <CloseButton onClick={onClose} alignSelf="flex-end" />
        <Text fontSize="xl" fontWeight="bold">
          Permanent Drawer
        </Text>
        {/* Add your drawer content here */}
      </VStack>
    </Box>
  );
};

export default PermanentDrawer;