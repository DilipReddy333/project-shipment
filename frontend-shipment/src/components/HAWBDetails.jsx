import Legend from "./legend/Legend";
import Commodity from "./Commodity";
import LabelWithInputField from "./label-with-input-field/LabelWithInputField";
import CustomButton from "./action-buttons/CustomButton";
import { useCallback, useState } from "react";

const HAWBDetails = ({ classname }) => {
  const [noOfHawbContainers, setNoOfHawbContainers] = useState(1);
  const createArray = useCallback((N) => {
    return [...Array(N).keys()].map((i) => i + 1);
  }, []);
  const addHawbContainer = () => {
    setNoOfHawbContainers((prev) => prev + 1);
  };
  const hawbContainers = createArray(noOfHawbContainers);
  console.log(hawbContainers);
  return (
    <>
      {hawbContainers?.map((container) => {
        return (
          <Legend key={container} legendName={"HAWB Details"}>
            <div className="mawbdetails_container">
              <div className={classname}>
                <LabelWithInputField
                  redLetter={"H"}
                  labelName={"AWB No."}
                  inputPlaceHolder={"HAWB No."}
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
                {container === 1 && (
                  <CustomButton
                    btnClassname={"save_btn add_btn"}
                    btnContent={"Add"}
                    btnIcon={"plus"}
                    iconPosition={"left"}
                    onClick={addHawbContainer}
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
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
                <Commodity />
              </div>
            </div>
          </Legend>
        );
      })}
    </>
  );
};
export default HAWBDetails;
