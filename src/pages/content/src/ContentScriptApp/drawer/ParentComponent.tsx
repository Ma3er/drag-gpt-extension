import React, { useState, useEffect } from "react";
// Removed unused import handleDrawerClick
import SideDrawer from "./SideDrawer";

const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    console.log("Button clicked, opening drawer");
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    console.log("Rendering ParentComponent");
  }, []);

  return (
    <div>
      <button onClick={handleButtonClick}>Open Drawer</button>
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
   </div>
  );
};

export default ParentComponent;
