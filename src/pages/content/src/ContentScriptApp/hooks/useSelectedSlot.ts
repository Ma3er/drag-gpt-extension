import { useState, useEffect } from 'react';
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";

type Slot = {
  id: string;
  name: string;
  isSelected?: boolean;
  type: "gpt4-turbo" | "gpt4o";
};

const useSelectedSlot = () => {
  const [updatedSlots, setUpdatedSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    const fetchSelectedSlot = async () => {
      const slots = await SlotStorage.getAllSlots();
      setUpdatedSlots(slots);
      const selected = slots.find(slot => slot.isSelected);
      setSelectedSlot(selected || null);
    };

    fetchSelectedSlot();
  }, []);

  const updateSelectedSlot = async (slotId: string, callback?: () => void) => {
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map(slot => ({
      ...slot,
      isSelected: slot.id === slotId,
    }));
    await SlotStorage.setAllSlots(updatedSlots);
    setUpdatedSlots(updatedSlots);
    const selected = updatedSlots.find(slot => slot.isSelected) || null;
    setSelectedSlot(selected);
    console.log("From useSelectedSlot 🚨   updatedSlots", updatedSlots);
    console.log("From useSelectedSlot 🚨🟨   selectedSlot", selected);
    if (callback) callback();
  };

  return { selectedSlot, updateSelectedSlot, updatedSlots };
};

export default useSelectedSlot;
