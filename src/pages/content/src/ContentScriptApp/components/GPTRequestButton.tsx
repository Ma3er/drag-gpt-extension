import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from 'react';
import { Tooltip, IconButton, Stack, Spinner, Text } from '@chakra-ui/react';
import { ChatIcon, AddIcon, EditIcon } from '@chakra-ui/icons';
import { SlotStorage } from "@pages/background/lib/storage/slotStorage"; // Ensure this import is correct
import { px } from 'framer-motion';

type Slot = {
  id: string;
  name: string;
  isSelected?: boolean; // Add isSelected property
  // dd other properties as needed
};

type GPTRequestButtonProps = {
  top: number;
  left: number;
  loading: boolean;
  onRequestClick: (slot: Slot) => void;
  onAddClick: (slot: Slot) => void;
  onEditClick: (slot: Slot) => void;
  selectedSlot?: Slot | null; // Update this line
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
  selectedSlot,
  ...divProps
}) => {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    // Fetch slots from storage
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots();
      setSlots(allSlots.slice(0, 3)); // Get top 3 slots
    };

    fetchSlots();
  }, []);

  const handleSlotClick = (slot: Slot) => {
    const updatedSlots = slots.map(s => ({
      ...s,
      isSelected: s.id === slot.id,
    }));
    setSlots(updatedSlots);
  };

  return (
    <div
      {...divProps}
      style={{ position: 'absolute', top, left, background: 'white', border: '2px', borderRadius: "radii", padding: "4px" }}
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
                  colorScheme={slots[0]?.isSelected ? "blue" : "teal"}
                  onClick={() => {
                    handleSlotClick(slots[0]);
                    onRequestClick(slots[0]);
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
                  colorScheme={slots[1]?.isSelected ? "blue" : "teal"}
                  onClick={() => {
                    handleSlotClick(slots[1]);
                    onAddClick(slots[1]);
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
                  colorScheme={slots[2]?.isSelected ? "blue" : "teal"}
                  onClick={() => {
                    handleSlotClick(slots[2]);
                    onEditClick(slots[2]);
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