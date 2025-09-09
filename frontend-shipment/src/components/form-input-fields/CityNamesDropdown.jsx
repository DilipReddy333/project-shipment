import { Dropdown } from "semantic-ui-react";
import { airportOptions } from "../../../utils/airportNames";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";
import DisplayLabel from "../display-label/DisplayLabel";
import { forwardRef, useState } from "react";

const CityNamesDropdown = forwardRef(
  ({ letter, editValue, label, error, name, placeholder, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(
      editValue ? editValue : ""
    );
    const [options, setOptions] = useState(airportOptions);
    const handleAddItem = (e, { value }) => {
      setOptions((prev) => [{ text: value, value, key: value }, ...prev]);
    };
    const handleChange = (e, { value }) => {
      setCurrentValue(value);
    };
    return (
      <>
        <div className="group_name_container">
          <label>
            <FirstLetterColor letter={letter} />
            <DisplayLabel label={label} />
          </label>
          <Dropdown
            ref={ref}
            search
            selection
            fluid
            allowAdditions
            name={name}
            options={options}
            placeholder={placeholder}
            value={currentValue}
            onAddItem={handleAddItem}
            onChange={handleChange}
            {...props}
          />
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
  }
);

export default CityNamesDropdown;
