// ParentComponent.tsx
import React, { useState, useEffect } from "react";
import PermanentDrawer from "./SideDrawer"; // Ensure this path is correct

const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Add event listener for the Esc key to close the drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <PermanentDrawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} />
      <div style={{ marginLeft: isDrawerOpen ? "250px" : "0", transition: "margin-left 0.3s" }}>
        {/* Your main content goes here */}
        <button onClick={handleToggleDrawer}>
          {isDrawerOpen ? "Close Drawer" : "Open Drawer"}
        </button>
      </div>
    </div>
  );
};

export default ParentComponent;