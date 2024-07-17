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
      onChatClick={() => { }}
      onOpenDrawer={() => { }}
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
      onChatClick={() => { }}
      onOpenDrawer={() => { }}
      selectedSlot={mockSlot}
    />
  );
});