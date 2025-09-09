import { Input } from "semantic-ui-react";
import DisplayLabel from "../display-label/DisplayLabel";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";

const LabelWithInputField = ({
  redLetter,
  labelName,
  inputPlaceHolder,
  error,
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
        {error && (
          <p
            className="field_error"
            // style={{ bottom: `${error?.length > 24 ? "-40px" : "-20px"}` }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default LabelWithInputField;
