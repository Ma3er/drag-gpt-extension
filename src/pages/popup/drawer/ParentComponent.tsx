import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import SideDrawer from '@pages/popup/drawer/sideDrawer';
import GPTRequestButton from "src/pages/content/src/ContentScriptApp/components/GPTRequestButton";

const ParentComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenDrawer = () => {
    console.log('Drawer opened');
    console.log('🦺 ParentComponent -> isOpen', isOpen);
    console.log('🦺 ParentComponent -> onOpen', onOpen);
    onOpen();
  };

  return (
    <div>
      <GPTRequestButton
        top={100}
        left={100}
        loading={false}
        onChatClick={(slot) => console.log('Chat clicked', slot)}
        onOpenDrawer={handleOpenDrawer}
        selectedSlot={null}
      />
      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ParentComponent;