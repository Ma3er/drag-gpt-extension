import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from 'react';
import { Tooltip, IconButton, Stack, Spinner } from '@chakra-ui/react';
import { ChatIcon, AddIcon, EditIcon } from '@chakra-ui/icons';
import useSelectedSlot from "@pages/content/src/ContentScriptApp/hooks/useSelectedSlot"; // Adjust the import path as needed
import { SlotStorage } from "@pages/background/lib/storage/slotStorage"; // Added import for SlotStorage

type Slot = {
  id: string;
  name: string;
  isSelected?: boolean;
};

type GPTRequestButtonProps = {
  top: number;
  left: number;
  loading: boolean;
  onRequestClick: (slot: Slot) => void;
  onAddClick: (slot: Slot) => void;
  onEditClick: (slot: Slot) => void;
  updatedSlots: (slot: Slot) => void;
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
  ...divProps
}) => {
  const { selectedSlot, updateSelectedSlot } = useSelectedSlot(); // Removed getAllSlots
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(); // New state to track selected slot ID

  useEffect(() => {
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots(); // Fetch slots directly from SlotStorage
      setSlots(allSlots.slice(0, 3)); // Get top 3 slots
    };

    fetchSlots();
  }, []);

  const handleSlotClick = async (slot: Slot, callback: (slot: Slot) => void) => {
    await updateSelectedSlot(slot.id); // Update selected slot
    setSelectedSlotId(slot.id); // Update selected slot ID
    callback(slot); // Ensure callback is called after state update
  };

  return (
    <div
      {...divProps}
      style={{ position: 'absolute', top, left, background: 'white', border: '2px', borderRadius: "radii", padding: "1px" }}
    >
      {loading ? (
        <Spinner size="xs" />
      ) : (
        <Stack direction="row" spacing={2}>
          {slots.length > 0 && (
            <>
              <Tooltip label={slots[0]?.name}>
                <IconButton
                  aria-label="request"
                  icon={<ChatIcon />}
                  size="xs"
                  colorScheme={slots[0]?.id === selectedSlotId ? "blue" : "teal"} // Use selectedSlotId to determine isSelected
                  onClick={() => {
                    console.log('ChatIcon IconButton clicked:', slots[0]);
                    handleSlotClick(slots[0], onRequestClick);
                  }}
                  variant="outline"
                  border="2px"
                />
              </Tooltip>
              <Tooltip label={slots[1]?.name}>
                <IconButton
                  aria-label="add"
                  icon={<AddIcon />}
                  size="xs"
                  colorScheme={slots[1]?.id === selectedSlotId ? "blue" : "teal"} // Use selectedSlotId to determine isSelected
                  onClick={() => {
                    console.log('AddIcon IconButton clicked:', slots[1]);
                    handleSlotClick(slots[1], onAddClick);
                  }}
                  variant="outline"
                  border="2px"
                />
              </Tooltip>
              <Tooltip label={slots[2]?.name}>
                <IconButton
                  aria-label="edit"
                  icon={<EditIcon />}
                  size="xs"
                  colorScheme={slots[2]?.id === selectedSlotId ? "blue" : "teal"} // Use selectedSlotId to determine isSelected
                  onClick={() => {
                    console.log('EditIcon IconButton clicked:', slots[2]);
                    handleSlotClick(slots[2], onEditClick);
                  }}
                  variant="outline"
                  border="2px"
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