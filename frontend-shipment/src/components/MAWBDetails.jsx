import Legend from "./legend/Legend";
import LabelWithInputField from "./label-with-input-field/LabelWithInputField";
import LabelWithDropdown from "./label-with-dropdown/LabelWithDropdown";
import ClientInputField from "./form-input-fields/ClientInputField";
import CityNamesDropdown from "./form-input-fields/CityNamesDropdown";
import { forwardRef } from "react";

const MAWBDetails = forwardRef(
  (
    {
      mawbDetailToEdit,
      errors,
      classname,
      clientNameRef,
      originRef,
      destinationRef,
    },
    ref
  ) => {
    console.log("Mawb errors:", errors);
    return (
      <>
        <Legend legendName={"MAWB Details"}>
          <div className="mawbdetails_container">
            <div className={classname}>
              {/* <LabelWithDropdown /> */}
              <ClientInputField
                value={
                  mawbDetailToEdit?.clientName
                    ? mawbDetailToEdit.clientName
                    : ""
                }
                error={errors?.clientNameError || ""}
                ref={clientNameRef}
              />

              {/* MAWB No. */}
              <LabelWithInputField
                redLetter={"M"}
                labelName={"AWB No."}
                error={errors?.mawbNoError}
                inputPlaceHolder={"Enter 11 digit MAWB No."}
                name="mawbNo"
                maxLength={11}
                defaultValue={
                  mawbDetailToEdit?.mawbNo ? mawbDetailToEdit.mawbNo : ""
                }
              />

              {/* Origin */}
              <CityNamesDropdown
                letter={"O"}
                label={"rigin"}
                error={errors?.originError || ""}
                name="origin"
                editValue={
                  mawbDetailToEdit?.origin ? mawbDetailToEdit.origin : ""
                }
                placeholder={"Origin"}
                ref={originRef}
              />

              {/* Destination */}
              <CityNamesDropdown
                letter={"D"}
                label={"estination"}
                error={errors?.destinationError || ""}
                name="destination"
                editValue={
                  mawbDetailToEdit?.destination
                    ? mawbDetailToEdit.destination
                    : ""
                }
                placeholder={"Destination"}
                ref={destinationRef}
              />
            </div>
            <div className="bottom_container">
              {/* Total No. of Pieces */}
              <LabelWithInputField
                redLetter={"T"}
                error={errors?.totalNoOfPiecesError || ""}
                labelName={"otal No. of Pieces"}
                inputPlaceHolder={"Total No. of Pieces"}
                name="pieces"
                type={"number"}
                defaultValue={
                  mawbDetailToEdit?.totalNoOfPieces
                    ? mawbDetailToEdit.totalNoOfPieces
                    : ""
                }
              />

              {/* Gross Weight */}
              <LabelWithInputField
                redLetter={"G"}
                defaultValue={
                  mawbDetailToEdit?.grossWeight
                    ? mawbDetailToEdit.grossWeight
                    : ""
                }
                error={errors?.grossWeightError || ""}
                labelName={"ross Weight"}
                inputPlaceHolder={"Gross Weight"}
                name="grossWeight"
                type={"number"}
              />
            </div>
          </div>
        </Legend>
      </>
    );
  }
);

export default MAWBDetails;
