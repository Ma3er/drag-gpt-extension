// SideDrawer.tsx
import React, { useRef } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';
  import { Button } from '@chakra-ui/button';
  import { Input } from '@chakra-ui/input';
  import React from 'react';
  
  interface DrawerPopupProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const SideDrawer: React.FC<DrawerPopupProps> = ({ isOpen, onClose }) => {
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
  
    return (
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
  
          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>
  
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default SideDrawer;