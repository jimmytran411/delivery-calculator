import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FakeTimers from '@sinonjs/fake-timers';

import { Calculator } from '..';
let clock: FakeTimers.Clock;

describe('Calculator component test', () => {
  beforeEach(() => {
    clock = FakeTimers.createClock();
  });

  jest.useFakeTimers('modern').setSystemTime(new Date('March 4, 2022 14:00:00'));
  const { getByRole, getByLabelText, getByText } = render(<Calculator />);

  test('User should be able to type in fields, and calculate the delivery fee with correct input', () => {
    userEvent.type(getByLabelText(/cart value/i), '9');
    userEvent.type(getByLabelText(/delivery distance/i), '2501');
    userEvent.type(getByLabelText(/items amount/i), '8');

    userEvent.click(getByRole('button', { name: /now: 14:00/i }));
    const listbox = within(getByRole('listbox'));
    userEvent.click(listbox.getByText(/15:00 - 16:00/i));

    clock.setTimeout(() => {
      userEvent.click(getByRole('button', { name: /calculate delivery price/i }));
      expect(getByText(/€1/i)).toBeInTheDocument();
      expect(getByText(/€6/i)).toBeInTheDocument();
      expect(getByText(/€2/i)).toBeInTheDocument();
      expect(getByText(/€0.90/i)).toBeInTheDocument();
      expect(getByText(/€9.9/i)).toBeInTheDocument();
    }, 1000);
  });
});
