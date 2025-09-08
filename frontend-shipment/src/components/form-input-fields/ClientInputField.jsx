import React, { useState, useCallback, forwardRef, useEffect } from "react";
import { Form, Input, Dropdown, Button } from "semantic-ui-react";
import debounce from "lodash.debounce";
import { fetchUrl } from "../../urls/URLs";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";
import DisplayLabel from "../display-label/DisplayLabel";
const ClientInputField = forwardRef(({ value, error }, ref) => {
  // const [formData, setFormData] = useState({
  //   clientName: "",
  //   mawbNo: "",
  //   origin: "",
  //   destination: "",
  //   pieces: "",
  //   grossWeight: "",
  // });

  const [clientOptions, setClientOptions] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(value ? value : "");

  // Debounced API fetch
  const fetchClients = useCallback(
    debounce(async (query) => {
      if (!query) return;
      setLoadingClients(true);
      try {
        const resp = await fetch(`${fetchUrl}/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();
        const options = data.clients.map((item) => ({
          key: item.groupName,
          value: item.groupName,
          text: item.groupName,
        }));
        setClientOptions(options);
      } catch (err) {
        console.error("Error fetching clients", err);
      } finally {
        setLoadingClients(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (e, { name, value }) => {
    // Input-specific restrictions
    // if (name === "mawbNo" && !/^\d{0,11}$/.test(value)) return;
    // if (name === "origin" && !/^[a-zA-Z]{0,3}$/.test(value)) return;
    // if (name === "pieces" && !/^\d*$/.test(value)) return;
    // if (name === "grossWeight" && !/^\d*\.?\d*$/.test(value)) return;

    // setFormData({ ...formData, [name]: value });

    if (name === "clientName") {
      fetchClients(value);
    }
  };

  useEffect(() => {
    if (value && dropdownValue) {
      setClientOptions((prev) => {
        // only add if not already present
        const exists = prev.some((opt) => opt.value === dropdownValue);
        if (!exists) {
          return [
            { key: dropdownValue, text: dropdownValue, value: dropdownValue },
            ...prev,
          ];
        }
        return prev;
      });
    }
  }, [value, dropdownValue]);

  // const handleClear = () => {
  //   setFormData({
  //     clientName: "",
  //     mawbNo: "",
  //     origin: "",
  //     destination: "",
  //     pieces: "",
  //     grossWeight: "",
  //   });
  //   setClientOptions([]);
  // };

  // const handleSave = async () => {
  //   // Simple validations
  //   if (formData.mawbNo.length !== 11) {
  //     alert("MAWB No. must be 11 digits");
  //     return;
  //   }
  //   if (formData.origin.length !== 3) {
  //     alert("Origin must be 3 letters");
  //     return;
  //   }

  //   try {
  //     await axios.post("/api/shipments", formData);
  //     alert("Shipment saved successfully!");
  //     handleClear();
  //   } catch (err) {
  //     console.error("Error saving shipment", err);
  //     alert("Failed to save shipment");
  //   }
  // };

  return (
    <>
      {/* Client Name with dropdown */}
      <div className="group_name_container">
        <label>
          <FirstLetterColor letter={"G"} />
          <DisplayLabel label={"roup Name"} />
        </label>
        <Dropdown
          ref={ref}
          fluid
          search
          selection
          clearable={value.length > 0 ? true : false}
          options={clientOptions}
          placeholder="Search Client..."
          // defaultValue="Hello world"
          value={dropdownValue}
          loading={loadingClients}
          name={"clientName"}
          onSearchChange={(e, { searchQuery }) =>
            handleInputChange(e, { name: "clientName", value: searchQuery })
          }
          onChange={(e, { value }) => {
            setDropdownValue(value);
          }}
        />
        {error && <p className="field_error">{error}</p>}
      </div>

      {/* <Form.Field>
        <label>Origin</label>
        <Input
          placeholder="3-letter code"
          name="origin"
          value={formData.origin.toUpperCase()}
          onChange={handleInputChange}
          maxLength={3}
        />
      </Form.Field>

      <div className="group_name_container">
        <label>Destination</label>
        <Dropdown
          fluid
          search
          selection
          allowAdditions
          options={airportOptions}
          placeholder="Select or add destination"
          value={formData.destination}
          onChange={(e, { value }) =>
            setFormData({ ...formData, destination: value })
          }
        />
      </div> */}

      {/* <Form.Field>
        <label>Total No. of Pieces</label>
        <Input
          placeholder="Enter pieces"
          name="pieces"
          value={formData.pieces}
          onChange={handleInputChange}
        />
      </Form.Field> */}

      {/* <Form.Field>
        <label>Gross Weight (kgs)</label>
        <Input
          placeholder="Enter weight in kgs"
          name="grossWeight"
          value={formData.grossWeight}
          onChange={handleInputChange}
        />
      </Form.Field> */}

      {/* <Button primary onClick={handleSave}>
        Save
      </Button>
      <Button secondary onClick={handleClear}>
        Clear
      </Button> */}
    </>
  );
});

export default ClientInputField;
