import Legend from "./legend/Legend";
import LabelWithInputField from "./label-with-input-field/LabelWithInputField";
import LabelWithDropdown from "./label-with-dropdown/LabelWithDropdown";

const MAWBDetails = ({ classname }) => {
  return (
    <>
      <Legend legendName={"MAWB Details"}>
        <div className="mawbdetails_container">
          <div className={classname}>
            <LabelWithDropdown />
            <LabelWithInputField
              redLetter={"M"}
              labelName={"AWB No."}
              inputPlaceHolder={"MAWB No."}
            />
            <LabelWithInputField
              redLetter={"O"}
              labelName={"rigin"}
              inputPlaceHolder={"Origin"}
            />
            <LabelWithInputField
              redLetter={"D"}
              labelName={"estination"}
              inputPlaceHolder={"Destination"}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              width: "46%",
            }}
          >
            <LabelWithInputField
              redLetter={"T"}
              labelName={"otal No. of Pieces"}
              inputPlaceHolder={"Total No. of Pieces"}
            />
            <LabelWithInputField
              redLetter={"G"}
              labelName={"ross Weight"}
              inputPlaceHolder={"Gross Weight"}
            />
          </div>
        </div>
      </Legend>
    </>
  );
};

export default MAWBDetails;
