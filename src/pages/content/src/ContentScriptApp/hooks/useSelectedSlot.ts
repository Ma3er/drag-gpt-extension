import { useState, useEffect } from 'react';
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";
//// return here -----------------------------
const useSelectedSlot = () => {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    const fetchSelectedSlot = async () => {
      const slots = await SlotStorage.getAllSlots();
      const selected = slots.find(slot => slot.isSelected);
      setSelectedSlot(selected || null);
    };

    fetchSelectedSlot();
  }, []);

  const updateSelectedSlot = async (slotId: string) => {
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map(slot => ({
      ...slot,
      isSelected: slot.id === slotId,
    }));
    await SlotStorage.setAllSlots(updatedSlots); // Use setAllSlots method
    setSelectedSlot(updatedSlots.find(slot => slot.isSelected) || null);
  };

  return { selectedSlot, updateSelectedSlot };
};

export default useSelectedSlot;