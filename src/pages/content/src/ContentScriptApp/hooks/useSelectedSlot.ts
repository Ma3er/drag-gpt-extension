<<<<<<< HEAD
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
=======
import { useState } from "react";
import { sendMessageToBackgroundAsync } from "@src/chrome/message";
import { SlotsManipulatorService } from "@pages/background/lib/service/slotsManipulatorService";
import { useInterval } from "@chakra-ui/react";

export default function useSelectedSlot(pollIntervalMs = 1500) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>();

  const getSelectedSlot = async (): Promise<Slot | undefined> => {
    if (window.document.hidden) {
      return;
    }

    try {
      const slots = await sendMessageToBackgroundAsync({ type: "GetSlots" });
      return SlotsManipulatorService.getSelectedSlot(slots);
    } catch (e) {
      return undefined;
    }
  };

  useInterval(() => {
    getSelectedSlot().then(setSelectedSlot);
  }, pollIntervalMs);

  return selectedSlot;
}
>>>>>>> 2cd2bd140c362c9499975d59ee798fcb3d5e282a
