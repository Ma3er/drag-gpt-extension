// ParentComponent.tsx
import React, { useState, useEffect } from 'react';
import SideDrawer from './SideDrawer';

const ParentComponent: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log('Drawer state changed:', isDrawerOpen);
  }, [isDrawerOpen]);

  const handleButtonClick = () => {
    console.log('Button clicked, toggling drawer state');
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Open Drawer</button>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default ParentComponent;