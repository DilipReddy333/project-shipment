import { Input } from "semantic-ui-react";
import DisplayLabel from "../display-label/DisplayLabel";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";

const LabelWithInputField = ({
  redLetter,
  labelName,
  inputPlaceHolder,
  ...props
}) => {
  // console.count("label with input field");
  return (
    <>
      <div className="group_name_container">
        <label>
          <FirstLetterColor letter={redLetter} />
          <DisplayLabel label={labelName} />
        </label>
        <Input placeholder={inputPlaceHolder} {...props} />
      </div>
    </>
  );
};

export default LabelWithInputField;
