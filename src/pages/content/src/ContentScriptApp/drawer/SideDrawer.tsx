import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Drawer Header</DrawerHeader>
        <DrawerBody>
          {/* Add your content here */}
          Content goes here...
        </DrawerBody>
        <DrawerFooter>
          {/* Add footer content here */}
          Footer content...
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
