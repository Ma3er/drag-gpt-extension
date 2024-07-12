import React, { CSSProperties, ComponentPropsWithRef, useEffect, useState } from 'react';
import { Tooltip, IconButton, Stack, Spinner } from '@chakra-ui/react';
import { ChatIcon, AddIcon, EditIcon } from '@chakra-ui/icons';
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";

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
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map(slot => ({
      ...slot,
      isSelected: slot.id === slotId,
    }));
    await SlotStorage.setAllSlots(updatedSlots);
    setSelectedSlotId(slotId);
  };

  const handleSlotClick = async (slot: Slot, callback: (slot: Slot) => void) => {
    if (slot.id !== selectedSlotId) {
      await updateSelectedSlot(slot.id);
      await selectSlot(slot);
    }
    callback(slot);
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
                  colorScheme={slots[0]?.id === selectedSlotId ? "orange" : "teal"}
                  onClick={() => {
                    console.log('ChatIcon IconButton clicked:', slots[0]);
                    handleSlotClick(slots[0], onRequestClick);
                  }}
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
                  onClick={() => {
                    console.log('AddIcon IconButton clicked:', slots[1]);
                    handleSlotClick(slots[1], onAddClick);
                  }}
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
                  onClick={() => {
                    console.log('EditIcon IconButton clicked:', slots[2]);
                    handleSlotClick(slots[2], onEditClick);
                  }}
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
};

export default GPTRequestButton;