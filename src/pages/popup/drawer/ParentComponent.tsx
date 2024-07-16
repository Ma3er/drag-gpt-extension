import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import SideDrawer from './SideDrawer';
import GPTRequestButton from "../../content/src/ContentScriptApp/components/GPTRequestButton";

const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    console.log('Button clicked, opening drawer');
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    console.log('handleButtonClick function:', handleButtonClick);
  }, []);

  return (
    <div>
      <GPTRequestButton 
        top={0} 
        left={0} 
        loading={false} 
        onChatClick={(slot) => { console.log(slot); }} 
        selectedSlot={null} 
        onOpenDrawer={handleButtonClick} // Ensure this prop is correctly passed
      />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default ParentComponent;