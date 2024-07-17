import React, { useEffect, useState } from "react";
import { Tooltip, IconButton, Stack, Spinner } from "@chakra-ui/react";
import { ChatIcon, CopyIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { SlotStorage } from "@pages/background/lib/storage/slotStorage";

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
  onOpenDrawer: () => void;
  selectedSlot: Slot | null;
} & React.ComponentPropsWithRef<"div">;

const GPTRequestButton: React.FC<GPTRequestButtonProps> = ({
  top,
  left,
  loading,
  onChatClick,
  selectedSlot,
  onOpenDrawer,
  ...divProps
}) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();
  const [selectedText, setSelectedText] = useState("");
  // Log the onOpen  Drawer prop-------------------------------------------------
  useEffect(() => {
    console.log("GPTRequestButton received onOpenDrawer prop:", onOpenDrawer);
  }, [onOpenDrawer]);
  
  // Handel Drawer Click =======================================================
  const handleDrawerClick = () => {
    console.log("handleClick called");
    if (typeof onOpenDrawer === "function") {
      onOpenDrawer();
    } else {
      console.error("onOpenDrawer is not a function:", onOpenDrawer);
    }
  };
  useEffect(() => {
    const fetchSlots = async () => {
      const allSlots = await SlotStorage.getAllSlots();
      console.log("Fetched slots:", allSlots);
      setSlots(allSlots.slice(0, 5));
    };

    fetchSlots();
  }, []);

  const updateSelectedSlot = async (slotId: string) => {
    console.log("Updating selected slot to:", slotId);
    const slots = await SlotStorage.getAllSlots();
    const updatedSlots = slots.map((slot) => ({
      ...slot,
      isSelected: slot.id === slotId,
    }));
    setSlots(updatedSlots);
    setSelectedSlotId(slotId);
  };

  const handleSlotClick = async (
    slot: Slot,
    callback: (slot: Slot) => void
  ) => {
    await updateSelectedSlot(slot.id);
    callback(slot);
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection()?.toString() || "";
    console.log("📋 Selected text:", selectedText);
    setSelectedText(selectedText);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard:", text);
  };

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transform: 'translateY(-100%)',
        background: "white",
        borderRadius: "6px",
        border: "2px solid teal",
        padding: 4,
        boxShadow: "dark-lg",
        zIndex: 9999,
        fontSize: "xs",
      }}
      {...divProps}
      onMouseUp={handleTextSelection}
    >
      {loading ? (
        <Spinner color="red.500" />
      ) : (
        <Stack direction="row" spacing={3}>
          {slots.length > 0 && (
            <>
              <Tooltip
                label="Clipboard"
                fontSize="xs"
                bg="gray.700"
                color="black"
              >
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
                <Tooltip
                  key={slot.id}
                  label={slot.name}
                  fontSize="xs"
                  bg="gray.700"
                  color="black"
                >
                  <IconButton
                    aria-label={`button${index}`}
                    icon={<ChatIcon />}
                    size="xs"
                    colorScheme={slot.id === selectedSlotId ? "orange" : "teal"}
                    onClick={() => handleSlotClick(slot, onChatClick)}
                    variant="outline"
                    border="2px"
                    backgroundColor={
                      slot.id === selectedSlotId ? "orange" : "transparent"
                    }
                  />
                </Tooltip>
              ))}
              <IconButton
                size="xs"
                colorScheme="blue"
                icon={<ArrowRightIcon />}
                aria-label="Open Drawer"
                onClick={handleDrawerClick}
              />
            </>
          )}
        </Stack>
      )}
    </div>
  );
};

export default GPTRequestButton;
