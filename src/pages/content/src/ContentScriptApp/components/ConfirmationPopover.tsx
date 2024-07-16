import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverAnchor,
  RadioGroup,
  Radio,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useBoolean } from "@chakra-ui/react";

type Tone = 'Normal' | 'informal' | 'friendly' | 'professional' | 'fun';

const ConfirmationPopover: React.FC<{ tone: Tone, setTone: (tone: Tone) => void, onSubmit: (tone: Tone) => void }> = ({ tone, setTone, onSubmit }) => {
  const [isEditing, setIsEditing] = useBoolean();

  // Mapping of tones to colors
  const toneColors: Record<Tone, string> = {
    Normal: '🟩',
    informal: '🟥',
    friendly: '🟦',
    professional: '🟪',
    fun: '🤡',
  };

  return (
    <Popover
      isOpen={isEditing}
      onOpen={setIsEditing.on}
      onClose={setIsEditing.off}
      closeOnBlur={false}
      isLazy
      lazyBehavior='keepMounted'
    >
      <HStack>
        <PopoverAnchor>
          <div style={{ color: toneColors[tone], display: 'inline-flex' }}>
            {toneColors[tone]}
          </div>
        </PopoverAnchor>

        <PopoverTrigger>
          <IconButton size="xs" aria-label='Edit' icon={<EditIcon />} />
        </PopoverTrigger>
      </HStack>

      <PopoverContent>
        <PopoverBody>
          Tone:
          <RadioGroup value={tone} onChange={(newTone) => setTone(newTone as Tone)}>
            <Radio value='Normal'>Formal</Radio>
            <Radio value='informal'>Informal</Radio>
            <Radio value='friendly'>Friendly</Radio>
            <Radio value='professional'>Professional</Radio>
            <Radio value='fun'>Fun</Radio>
          </RadioGroup>
          <Button onClick={() => onSubmit(tone)}>Submit</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmationPopover;