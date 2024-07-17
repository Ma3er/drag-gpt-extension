// ParentComponent.tsx
import React, { useState } from 'react';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button } from '@chakra-ui/react';
import GPTRequestButton from "../components/GPTRequestButton" // Adjust the path as necessary

const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <GPTRequestButton
        top={10}
        left={10}
        loading={false}
        onChatClick={(slot) => console.log(slot)}
        onOpenDrawer={handleOpenDrawer}
        selectedSlot={null}
      />
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Drawer Title</DrawerHeader>
          <DrawerBody>
            Drawer Content
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ParentComponent;