import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from 'react';
import { Tooltip, IconButton, Stack, Spinner } from '@chakra-ui/react';
import { ChatIcon, AddIcon, EditIcon } from '@chakra-ui/icons';
import useSelectedSlot from '@pages/content/src/ContentScriptApp/hooks/useSelectedSlot';
import { SlotStorage } from '@pages/background/lib/storage/slotStorage';

type Slot = {
  id: string;
  name: string;
  isSelected?: boolean;
  type: "gpt4-turbo" | "gpt4o"; // Ensure this matches the actual type values
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
} & ComponentPropsWithRef<"div">;

const labelTextInlineStyle: CSSProperties = {
  display: "block",
  fontSize: "13px",
  lineHeight: 1,
  margin: 0,
  maxWidth: "160px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  fontFamily: "Noto Sans KR, sans-serif",
};

const GPTRequestButton: React.FC<GPTRequestButtonProps> = ({
  top,
  left,
  loading,
  onRequestClick,
  onAddClick,
  onEditClick,
  updatedSlots,
  selectSlot,
  ...divProps
}) => {
  const { selectedSlot, updateSelectedSlot: updateHookSelectedSlot } = useSelectedSlot();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();

  useEffect(() => {
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots();
      setSlots(allSlots.slice(0, 3));
    };
  
    fetchSlots();
  }, []);
  
  const updateSelectedSlot = async (slotId: string) => {
    console.log('🔄 Updating selected slot to:', slotId);
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map((slot: Slot) => ({
      ...slot,
      isSelected: slot.id === slotId,
      type: slot.type // Ensure the type is included
    }));
    await SlotStorage.setAllSlots(updatedSlots);
    setSelectedSlotId(slotId);
    console.log('✅ Updated slots:', updatedSlots);
    console.log('🔵 New selectedSlotId:', slotId);
  };
  
  const handleSlotClick = async (slot: Slot, callback: (slot: Slot) => void) => {
    if (slot.id !== selectedSlotId) {
      await updateSelectedSlot(slot.id);
      await updateHookSelectedSlot(slot.id); // Ensure the hook's state is also updated
    }
    callback(slot);
  };

  return (
    <div style={{ position: 'absolute', top, left, background: 'white', borderRadius: '6px', border: '2px solid', borderColor: 'teal', padding: 4 }} {...divProps}>
      {loading ? (
        <Spinner size="xs" />
      ) : (
        <Stack direction="row" spacing={4}>
          {slots.length > 0 && (
            <>
              <Tooltip label={slots[0]?.name}>
                <IconButton
                  aria-label="request"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={slots[0]?.id === selectedSlotId ? "orange" : "teal"}
                  onClick={() => handleSlotClick(slots[0], onRequestClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={slots[0]?.id === selectedSlotId ? "orange.100" : "transparent"}
                />
              </Tooltip>
              <Tooltip label={slots[1]?.name}>
                <IconButton
                  aria-label="add"
                  icon={<AddIcon />}
                  size="xs"
                  colorScheme={slots[1]?.id === selectedSlotId ? "orange" : "teal"}
                  onClick={() => handleSlotClick(slots[1], onAddClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={slots[1]?.id === selectedSlotId ? "orange.100" : "transparent"}
                />
              </Tooltip>
              <Tooltip label={slots[2]?.name}>
                <IconButton
                  aria-label="edit"
                  icon={<EditIcon />}
                  size="xs"
                  colorScheme={slots[2]?.id === selectedSlotId ? "orange" : "teal"}
                  onClick={() => handleSlotClick(slots[2], onEditClick)}
                  variant="outline"
                  border="2px"
                  backgroundColor={slots[2]?.id === selectedSlotId ? "orange.100" : "transparent"}
                />
              </Tooltip>
            </>
          )}
        </Stack>
      )}
    </div>
  );
}

export default GPTRequestButton;
