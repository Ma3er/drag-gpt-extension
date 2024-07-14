<<<<<<< HEAD
import { render } from '@testing-library/react';
import GPTRequestButton from './GPTRequestButton';

const mockSlot = {
  id: '1',
  name: 'Mock Slot',
  isSelected: true,
  type: 'gpt4-turbo' as const
};

test('renders GPTRequestButton', () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={false}
      onRequestClick={() => { }}
      onAddClick={() => { }}
      onEditClick={() => { }}
      updatedSlots={() => { }}
      selectSlot={() => { }}
      selectedSlot={mockSlot}
    />
  );
});

test('renders GPTRequestButton with loading', () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={true}
      onRequestClick={() => { }}
      onAddClick={() => { }}
      onEditClick={() => { }}
      updatedSlots={() => { }}
      selectSlot={() => { }}
      selectedSlot={mockSlot}
    />
  );
=======
import GPTRequestButton from "@pages/content/src/ContentScriptApp/components/GPTRequestButton";
import { render, screen } from "@testing-library/react";

describe("GPTRequestButton test", () => {
  test("request 버튼이 노출된다", () => {
    // when
    render(<GPTRequestButton top={0} left={0} loading={false} />);

    // then
    screen.getByRole("button", { name: "request" });
  });
  test("로딩 상태에서 로딩중이라는 사실을 알 수 있다", () => {
    // when
    render(<GPTRequestButton top={0} left={0} loading />);

    // then
    screen.getByRole("button", { name: "Loading..." });
  });
>>>>>>> 2cd2bd140c362c9499975d59ee798fcb3d5e282a
});
