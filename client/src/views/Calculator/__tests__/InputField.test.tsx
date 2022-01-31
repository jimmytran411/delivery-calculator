import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from '../Components/InputField';

test('It should display inputfield component, user should be able to type into the input field and it should display error if there is any', () => {
  const { getByText, getByLabelText, rerender } = render(<InputField label="test field" name="test field" error="" />);

  const field = getByLabelText(/test field/i);
  userEvent.type(field, '12.5');

  expect(field).toHaveValue('12.5');

  rerender(<InputField label="test field" name="test field" error="test error" />);
  const error = getByText(/test error/i);
  expect(error).toHaveTextContent('test error');
});
