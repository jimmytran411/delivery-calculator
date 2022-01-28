import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeSelect } from '../Components/TimeSelect';

test('It should display a list of time', () => {
  const deliveryHours = Array.from(
    {
      length: 11,
    },
    (e, i) => `${i + 10}:00 - ${i + 11}:00`
  );
  const { getByRole } = render(<TimeSelect handleSelectTime={jest.fn()} listOfHours={deliveryHours} />);
  userEvent.click(getByRole('button'));

  const listbox = within(getByRole('listbox'));
  userEvent.click(listbox.getByText(/10:00 - 11:00/i));
  expect(getByRole('button')).toHaveTextContent(/10:00 - 11:00/i);
});
