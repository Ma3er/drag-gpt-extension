import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { COLORS, Z_INDEX } from "@src/constant/style";
import { Tooltip, IconButton, Stack, Spinner } from "@chakra-ui/react";
import { ChatIcon, AddIcon, EditIcon, CopyIcon } from "@chakra-ui/icons";
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";

const handleCopyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

type Slot = {
  id: string;
  name: string;
  isSelected?: boolean;
  type: "gpt4-turbo" | "gpt4o";
};

type GPTRequestButtonProps = {
  top: number;
  left: number;
  loading: boolean;
  onRequestClick: (slot: Slot) => void;
  onAddClick: (slot: Slot) => void;
  onEditClick: (slot: Slot) => void;
  updatedSlots: (slot: Slot) => void;
  selectSlot: (slot: Slot) => void;
  selectedSlot: Slot | null;
} & ComponentPropsWithRef<"div">;

const GPTRequestButton: React.FC<GPTRequestButtonProps> = ({
  top,
  left,
  loading,
  onRequestClick,
  onAddClick,
  onEditClick,
  updatedSlots,
  selectSlot,
  selectedSlot,
  ...divProps
}) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots();
      setSlots(allSlots.slice(0, 4));
    };

    fetchSlots();
  }, []);

  const updateSelectedSlot = async (slotId: string) => {
    console.log('🔄 Updating selected slot to:', slotId);
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map(slot => ({
      ...slot,
      isSelected: slot.id === slotId,
    }));
    await SlotStorage.setAllSlots(updatedSlots);
    setSelectedSlotId(slotId);
    console.log("✅ Updated slots:", updatedSlots);
    console.log("🔵 New selectedSlotId:", slotId);
  };

  const handleSlotClick = async (slot: Slot, callback: (slot: Slot) => void) => {
    if (slot.id !== selectedSlotId) {
      await updateSelectedSlot(slot.id);
    }
    callback(slot);
  };

  const handleTextSelection = () => {
    const text = window.getSelection()?.toString() || '';
    setSelectedText(text);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        background: "white",
        borderRadius: "6px",
        border: "2px solid teal",
        padding: 4,
        boxShadow: "dark-lg",
        zIndex: 9999,
        fontSize: 'xs',
      }}
      {...divProps}
      onMouseUp={handleTextSelection} // Add this to capture text selection
    >
      {loading ? (
        <Spinner color='red.500' />
      ) : (
        <Stack direction="row" spacing={4}>
          {slots.length > 0 && (
            <>
              <Tooltip label={slots[0]?.name} bg='gray.700' color='black'>
                <IconButton
                  aria-label="button0"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={
                    slots[0]?.id === selectedSlotId ? "orange" : "teal"
                  }
                  onClick={() => handleSlotClick(slots[0], onAddClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={
                    slots[0]?.id === selectedSlotId ? "orange" : "transparent"
                  }
                />
              </Tooltip>
              <Tooltip label={slots[1]?.name} bg='gray.700' color='black'>
                <IconButton
                  aria-label="button1"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={
                    slots[1]?.id === selectedSlotId ? "orange" : "teal"
                  }
                  onClick={() => handleSlotClick(slots[1], onAddClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={
                    slots[1]?.id === selectedSlotId ? "orange" : "transparent"
                  }
                />
              </Tooltip>
              <Tooltip label={slots[2]?.name} bg='gray.700' color='black'>
                <IconButton
                  aria-label="button2"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={
                    slots[2]?.id === selectedSlotId ? "orange" : "teal"
                  }
                  onClick={() => handleSlotClick(slots[2], onAddClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={
                    slots[2]?.id === selectedSlotId ? "orange" : "transparent"
                  }
                />
              </Tooltip>
              <Tooltip label={slots[3]?.name} bg='gray.700' color='black'>
                <IconButton
                  aria-label="button3"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={
                    slots[3]?.id === selectedSlotId ? "orange" : "teal"
                  }
                  onClick={() => handleSlotClick(slots[3], onAddClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={
                    slots[3]?.id === selectedSlotId ? "orange" : "transparent"
                  }
                />
              </Tooltip>
            </>
          )}
        </Stack>
      )}
    </div>
  );
};

export default GPTRequestButton;
