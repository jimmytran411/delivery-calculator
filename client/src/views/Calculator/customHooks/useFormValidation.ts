import { useEffect, useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({ cartValue: '', deliveryDistance: '', amountOfItems: '' });
  const [isEmptyError, setIsEmptyError] = useState(false);

  const validateField = (input: string | Date, prop: string) => {
    if (input === '') {
      setErrors((prev) => ({ ...prev, [prop]: 'This field is required' }));
    } else if (isNaN(+input)) {
      setErrors((prev) => ({ ...prev, [prop]: 'Please give a number' }));
    } else if (+input <= 0) {
      setErrors((prev) => ({ ...prev, [prop]: 'Please give a positive number' }));
    } else {
      setErrors((prev) => ({ ...prev, [prop]: '' }));
    }
  };
  useEffect(() => {
    setIsEmptyError(Object.values(errors).every((x) => x === null || x === ''));
  }, [errors]);

  return { errors, validateField, isEmptyError };
};
