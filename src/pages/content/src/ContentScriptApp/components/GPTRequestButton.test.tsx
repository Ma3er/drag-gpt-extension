import { render } from "@testing-library/react";
import GPTRequestButton from "./GPTRequestButton";

const mockSlot = {
  id: "1",
  name: "Mock Slot",
  isSelected: true,
  type: "gpt4-turbo" as const,
};

// Example handler functions for required props
const handleChatClick = () => {};
const handleOpenDrawer = () => {};

test("renders GPTRequestButton", () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={false}
      onChatClick={handleChatClick}
      onOpenDrawer={handleOpenDrawer}
      selectedSlot={mockSlot}
    />
  );
});

test("renders GPTRequestButton with loading", () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={true}
      onChatClick={handleChatClick}
      onOpenDrawer={handleOpenDrawer}
      selectedSlot={mockSlot}
    />
  );
});