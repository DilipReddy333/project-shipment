import { useState } from "react";

const isInvalidField = (value) => {
  return !value || value.trim().length === 0;
};

export const useFormValidation = () => {
  const [mawbErrors, setMawbErrors] = useState({});
  let newErrors = {};
  const validateMawbFields = (formValues) => {
    if (isInvalidField(formValues.clientName)) {
      newErrors["clientNameError"] = "Please fill this field";
    }
    if (isInvalidField(formValues.mawbNo)) {
      newErrors["mawbNoError"] = "Please fill this field";
    }
    if (
      !isInvalidField(formValues.mawbNo) &&
      formValues.mawbNo?.length !== 11
    ) {
      newErrors["mawbNoError"] = "Should only have 11 digits";
    }
    if (
      !isInvalidField(formValues.mawbNo) &&
      formValues.mawbNo?.length === 11
    ) {
      newErrors["mawbNoError"] = "";
    }
    if (isInvalidField(formValues.mawbOrigin)) {
      newErrors["originError"] = "Please fill this field";
    }
    if (
      !isInvalidField(formValues.mawbOrigin) &&
      formValues.mawbOrigin.length !== 3
    ) {
      newErrors["originError"] = "Should have only 3 characters";
    }
    if (
      !isInvalidField(formValues.mawbOrigin) &&
      formValues.mawbOrigin.length === 3
    ) {
      newErrors["originError"] = "";
    }
    if (isInvalidField(formValues.mawbDestination)) {
      newErrors["destinationError"] = "Please fill this field";
    }
    if (
      !isInvalidField(formValues.mawbDestination) &&
      formValues.mawbDestination.length !== 3
    ) {
      newErrors["destinationError"] = "Should have only 3 characters";
    }
    if (
      !isInvalidField(formValues.mawbDestination) &&
      formValues.mawbDestination.length === 3
    ) {
      newErrors["destinationError"] = "";
    }
    if (isInvalidField(formValues.totalNoOfPieces)) {
      newErrors["totalNoOfPiecesError"] = "Please fill this field";
    }
    if (isInvalidField(formValues.grossWeight)) {
      newErrors["grossWeightError"] = "Please fill this field";
    }
    // if (formValues.mawbNo?.length !== 11) {
    //   return "MAWB No. field should only have 11 digits.";
    // }
    // if (formValues.origin?.length !== 3) {
    //   return "Origin field should only have 3 characters.";
    // }
    // if (formValues.destination?.length !== 3) {
    //   return "Origin field should only have 3 characters.";
    // }
    setMawbErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return {
    mawbErrors,
    validateMawbFields,
  };
};
