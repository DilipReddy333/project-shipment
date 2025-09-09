import { useState } from "react";
import { isInvalidField } from "../utils/isInvalidField";

export const useHawbFieldsValidation = () => {
  const [errors, setErrors] = useState({});
  let newErrors = {};
  const validateHawbFields = (formValues, cIndex) => {
    if (isInvalidField(formValues.hawbNo)) {
      newErrors[`hawbNo${cIndex}`] = "Please fill this field";
    }
    if (!isInvalidField(formValues.hawbNo) && formValues.hawbNo.length > 25) {
      newErrors[`hawbNo${cIndex}`] =
        "Should be less than or equal to 25 digits";
    }
    if (!isInvalidField(formValues.hawbNo) && formValues.hawbNo.length <= 25) {
      newErrors[`hawbNo${cIndex}`] = "";
    }
    if (isInvalidField(formValues.origin)) {
      newErrors[`origin${cIndex}`] = "Please fill this field";
    }
    if (!isInvalidField(formValues.origin) && formValues.origin.length !== 3) {
      newErrors[`origin${cIndex}`] = "Should have only 3 characters";
    }
    if (!isInvalidField(formValues.origin) && formValues.origin.length === 3) {
      newErrors[`origin${cIndex}`] = "";
    }
    if (isInvalidField(formValues.destination)) {
      newErrors[`destination${cIndex}`] = "Please fill this field";
    }
    if (
      !isInvalidField(formValues.destination) &&
      formValues.destination.length !== 3
    ) {
      newErrors[`destination${cIndex}`] = "Should have only 3 characters";
    }
    if (
      !isInvalidField(formValues.destination) &&
      formValues.destination.length === 3
    ) {
      newErrors[`destination${cIndex}`] = "";
    }

    if (isInvalidField(formValues.totalNoOfPieces)) {
      newErrors[`totalNoOfPieces${cIndex}`] = "Please fill this field";
    }
    if (parseInt(formValues.totalNoOfPieces) < 0) {
      newErrors[`totalNoOfPieces${cIndex}`] = "Value should be greater than 0";
    }
    if (
      !isInvalidField(formValues.totalNoOfPieces) &&
      !parseInt(formValues.totalNoOfPieces) < 0
    ) {
      newErrors[`totalNoOfPieces${cIndex}`] = "";
    }

    if (isInvalidField(formValues.grossWeight)) {
      newErrors[`grossWeight${cIndex}`] = "Please fill this field";
    }
    if (parseInt(formValues.grossWeight) < 0) {
      newErrors[`grossWeight${cIndex}`] = "Value should be greater than 0";
    }
    if (
      !isInvalidField(formValues.grossWeight) &&
      !parseInt(formValues.grossWeight) < 0
    ) {
      newErrors[`grossWeight${cIndex}`] = "";
    }
    if (isInvalidField(formValues.commodity)) {
      newErrors[`commodity${cIndex}`] = "Please fill this field";
    }
    if (!isInvalidField(formValues.commodity) && formValues.length > 25) {
      newErrors[`commodity${cIndex}`] =
        "Value should be less than 25 characters";
    }
    if (!isInvalidField(formValues.commodity) && formValues.length <= 25) {
      newErrors[`commodity${cIndex}`] = "";
    }
    setErrors(newErrors);
    return Object.values(newErrors).filter((v) => v !== "").length === 0;
  };
  return {
    errors,
    validateHawbFields,
  };
};
