import React, { useState, useEffect } from "react";
import SideDrawer from './SideDrawer';
import GPTRequestButton from "../components/GPTRequestButton";


const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    console.log('Button clicked, opening drawer');
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    console.log('handleButtonClick function:', handleButtonClick);
  }, []);

  useEffect(() => {
    console.log('Rendering ParentComponent');
  }, []);

  return (
    <div>
      <GPTRequestButton 
        top={0} 
        left={0} 
        loading={false} 
        onChatClick={(slot) => { console.log(slot); }} 
        selectedSlot={null} 
        onOpenDrawer={handleButtonClick} 
      />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default ParentComponent;
