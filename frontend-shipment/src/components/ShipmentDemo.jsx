import React, { useState } from "react";
import "./ShipmentForm.css"; // Create a CSS file for styles

// Reusable Input component
const InputField = ({ label, type = "text", placeholder, disabled }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} placeholder={placeholder} disabled={disabled} />
  </div>
);

// Reusable Select component
const SelectField = ({ label, options, disabled }) => (
  <div className="input-group">
    <label>{label}</label>
    <select disabled={disabled}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ShipmentDemo = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    docLoc: "",
    mawbNo: "",
    mawbDate: "",
    origin: "",
    destination: "",
    totalPieces: "",
    shipmentType: "Total",
    grossWeight: "",
    unitWeight: "KG",
    hawbNo: "",
    hawbDate: "",
    hawbOrigin: "",
    hawbDestination: "",
    hawbTotalPieces: "",
    hawbGrossWeight: "",
    hawbUnitWeight: "KG",
    commodity: "",
  });

  const shipmentTypes = [
    { value: "Total", label: "Total" },
    { value: "Partial", label: "Partial" },
  ];

  const unitWeights = [
    { value: "KG", label: "KG" },
    { value: "LB", label: "LB" },
  ];

  const handleSave = () => {
    console.log("Form Data: ", formData);
    // Handle form save logic
  };

  return (
    <div className="form-container">
      <h3>Create Full Shipment Job</h3>
      <div className="section">
        <h4>MAWB Details</h4>
        <div className="form-row">
          <SelectField label="Group Name" options={shipmentTypes} />
          <SelectField label="Doc. Loc." options={shipmentTypes} />
          <InputField label="MAWB No." placeholder="MAWB No." />
          <InputField label="Date" type="date" />
          <SelectField
            label="Origin"
            options={[{ value: "", label: "Port of Origin" }]}
            disabled={true}
          />
          <SelectField
            label="Destination"
            options={[{ value: "", label: "--" }]}
          />
        </div>
        <div className="form-row">
          <InputField
            label="Total No. of Pieces"
            placeholder="Total No. of Pieces"
          />
          <SelectField label="Shipment Type" options={shipmentTypes} />
          <InputField label="Gross Weight" placeholder="Gross Weight" />
          <SelectField label="Unit Weight" options={unitWeights} />
        </div>
      </div>

      <div className="section">
        <h4>HAWB Details</h4>
        <div className="form-row">
          <InputField label="HAWB No." placeholder="HAWB No." />
          <InputField label="Date" type="date" />
          <SelectField
            label="Origin"
            options={[{ value: "", label: "Port of Origin" }]}
            disabled={true}
          />
          <SelectField
            label="Destination"
            options={[{ value: "", label: "--" }]}
          />
        </div>
        <div className="form-row">
          <InputField
            label="Total No. of Pieces"
            placeholder="Total No. of Pieces"
          />
          <SelectField label="Shipment Type" options={shipmentTypes} />
          <InputField label="Gross Weight" placeholder="Gross Weight" />
          <SelectField label="Unit Weight" options={unitWeights} />
        </div>
        <div className="form-row">
          <InputField label="Commodity" placeholder="Commodity" />
        </div>
      </div>

      <div className="button-group">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default ShipmentDemo;
