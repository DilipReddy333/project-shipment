import Legend from "./legend/Legend";
// import Commodity from "./Commodity";
import LabelWithInputField from "./label-with-input-field/LabelWithInputField";
import CustomButton from "./action-buttons/CustomButton";
import { forwardRef } from "react";
import CityNamesDropdown from "./form-input-fields/CityNamesDropdown";

const HAWBDetails = forwardRef(
  (
    {
      container,
      mawbDetailToEdit,
      classname,
      addHawbContainer,
      hawbOriginRef,
      hawbDestinationRef,
    },
    ref
  ) => {
    // console.log("hawbOriginRef:", hawbOriginRef.current.state);
    // console.log("hawbDestinationRef:", hawbDestinationRef.current.state);
    return (
      <>
        <Legend legendName={"HAWB Details"}>
          <div className="mawbdetails_container">
            <div className={classname}>
              {/* HAWB No. */}
              <LabelWithInputField
                redLetter={"H"}
                labelName={"AWB No."}
                inputPlaceHolder={"Enter 25 digit HAWB No."}
                name={`hawbNo${container}`}
                maxLength={125}
                defaultValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.hawbNo || ""
                }
              />

              {/* Origin */}
              <CityNamesDropdown
                letter={"O"}
                label={"rigin"}
                name="origin"
                editValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.origin || ""
                }
                placeholder={"Origin"}
                ref={hawbOriginRef}
              />

              {/* Destination */}
              <CityNamesDropdown
                letter={"D"}
                label={"estination"}
                editValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.destination || ""
                }
                name="destination"
                placeholder={"Destination"}
                ref={hawbDestinationRef}
              />

              {container === 1 && (
                <CustomButton
                  btnClassname={"save_btn add_btn"}
                  btnContent={"Add"}
                  btnIcon={"plus"}
                  iconPosition={"left"}
                  type="button"
                  onClick={addHawbContainer}
                />
              )}
            </div>
            <div className="bottom_container" style={{ width: "100%" }}>
              {/* Total No. of Pieces */}
              <LabelWithInputField
                redLetter={"T"}
                labelName={"otal No. of Pieces"}
                inputPlaceHolder={"Total No. of Pieces"}
                name={`hawbPieces${container}`}
                type={"number"}
                defaultValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.totalNoOfPieces ||
                  ""
                }
              />
              {/* Gross Weight */}
              <LabelWithInputField
                redLetter={"G"}
                labelName={"ross Weight"}
                inputPlaceHolder={"Gross Weight"}
                name={`hawbGrossWeight${container}`}
                type={"number"}
                defaultValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.grossWeight || ""
                }
              />
              {/* Commodity */}
              <LabelWithInputField
                redLetter={"C"}
                labelName={"ommodity"}
                inputPlaceHolder={"Commodity"}
                name={`hawbCommodity${container}`}
                defaultValue={
                  mawbDetailToEdit?.hawbIds[container - 1]?.commodity || ""
                }
              />
              {/* <Commodity /> */}
            </div>
          </div>
        </Legend>
      </>
    );
  }
);
export default HAWBDetails;
