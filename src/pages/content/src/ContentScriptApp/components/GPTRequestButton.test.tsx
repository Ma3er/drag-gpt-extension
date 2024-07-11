import { render } from '@testing-library/react';
import GPTRequestButton from './GPTRequestButton';

test('renders GPTRequestButton', () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={false}
      onRequestClick={() => {}}
      onAddClick={() => {}}
      onEditClick={() => {}}
      updatedSlots={() => {}} // Add this line
    />
  );
});

test('renders GPTRequestButton with loading', () => {
  render(
    <GPTRequestButton
      top={0}
      left={0}
      loading={true}
      onRequestClick={() => {}}
      onAddClick={() => {}}
      onEditClick={() => {}}
      updatedSlots={() => {}} // Add this line
    />
  );
});