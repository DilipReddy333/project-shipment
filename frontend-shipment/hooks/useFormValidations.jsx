import { useState } from "react";
import { isInvalidField } from "../utils/isInvalidField";

export const useFormValidation = () => {
  const [mawbErrors, setMawbErrors] = useState({});
  let newErrors = {};
  const validateMawbFields = (formValues) => {
    if (isInvalidField(formValues.clientName)) {
      newErrors["clientNameError"] = "Please fill this field";
    } else {
      newErrors["clientNameError"] = "";
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
    if (parseInt(formValues.totalNoOfPieces) < 0) {
      newErrors["totalNoOfPiecesError"] = "Value should be greater than 0";
    }
    if (
      !isInvalidField(formValues.totalNoOfPieces) &&
      !parseInt(formValues.totalNoOfPieces) < 0
    ) {
      newErrors["totalNoOfPiecesError"] = "";
    }
    if (isInvalidField(formValues.grossWeight)) {
      newErrors["grossWeightError"] = "Please fill this field";
    }
    if (parseInt(formValues.grossWeight) < 0) {
      newErrors["grossWeightError"] = "Value should be greater than 0";
    }
    if (
      !isInvalidField(formValues.grossWeight) &&
      !parseInt(formValues.grossWeight) < 0
    ) {
      newErrors["grossWeightError"] = "";
    }
    setMawbErrors(newErrors);
    return Object.values(newErrors).filter((v) => v !== "").length === 0;
  };
  return {
    mawbErrors,
    validateMawbFields,
  };
};
