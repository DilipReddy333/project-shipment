import { Input } from "semantic-ui-react";
import DisplayLabel from "../display-label/DisplayLabel";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";

const LabelWithInputField = ({ redLetter, labelName, inputPlaceHolder }) => {
  // console.count("label with input field");
  return (
    <>
      <div className="group_name_container">
        <div>
          <FirstLetterColor letter={redLetter} />
          <DisplayLabel label={labelName} />
        </div>
        <Input placeholder={inputPlaceHolder} />
      </div>
    </>
  );
};

export default LabelWithInputField;
