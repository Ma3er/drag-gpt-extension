import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { COLORS, Z_INDEX } from "@src/constant/style";
import { Tooltip, IconButton, Stack, Spinner } from "@chakra-ui/react";
import { ChatIcon, CopyIcon } from "@chakra-ui/icons";
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
  onChatClick: (slot: Slot) => void;
  selectedSlot: Slot | null;
} & ComponentPropsWithRef<"div">;

const GPTRequestButton: React.FC<GPTRequestButtonProps> = ({
  top,
  left,
  loading,
  onChatClick,
  selectedSlot,
  ...divProps
}) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots();
      setSlots(allSlots.slice(0, 5));
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
      onMouseUp={handleTextSelection}
    >
      {loading ? (
        <Spinner color='red.500' />
      ) : (
        <Stack direction="row" spacing={3}>
          {slots.length > 0 && (
            <>
              <Tooltip label="Clipboard" fontSize='xs' bg='gray.700' color='black'>
                <IconButton
                  aria-label="Copy to Clipboard"
                  icon={<CopyIcon />}
                  size="xs"
                  colorScheme="blue"
                  onClick={() => handleCopyToClipboard(selectedText)}
                  variant="outline"
                  border="2px"
                />
              </Tooltip>
              {slots.map((slot, index) => (
                <Tooltip key={slot.id} label={slot.name} bg='gray.700' color='black'>
                  <IconButton
                    aria-label={`button${index}`}
                    icon={<ChatIcon />}
                    size="xs"
                    colorScheme={slot.id === selectedSlotId ? "orange" : "teal"}
                    onClick={() => handleSlotClick(slot, onChatClick)}
                    variant="outline"
                    border="2px"
                    backgroundColor={slot.id === selectedSlotId ? "orange" : "transparent"}
                  />
                </Tooltip>
              ))}
            </>
          )}
        </Stack>
      )}
    </div>
  );
};

export default GPTRequestButton;