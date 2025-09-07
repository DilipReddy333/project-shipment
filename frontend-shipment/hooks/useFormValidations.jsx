import { useState } from "react";

const isInvalidField = (value) => {
  return !value || value.trim().length === 0;
};

export const useFormValidation = (formValues) => {
  const [errors, setErrors] = useState({});
  if (
    isInvalidField(formValues.clientName) ||
    isInvalidField(formValues.mawbNo) ||
    isInvalidField(formValues.origin) ||
    isInvalidField(formValues.destination) ||
    isInvalidField(formValues.pieces) ||
    isInvalidField(formValues.grossWeight)
  ) {
    return "Please fill all the fields";
  }
  if (formValues.mawbNo?.length !== 11) {
    return "MAWB No. field should only have 11 digits.";
  }
  if (formValues.origin?.length !== 3) {
    return "Origin field should only have 3 characters.";
  }
  if (formValues.destination?.length !== 3) {
    return "Origin field should only have 3 characters.";
  }
};
