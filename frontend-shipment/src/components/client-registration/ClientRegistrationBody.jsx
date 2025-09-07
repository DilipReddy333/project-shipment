import { Input } from "semantic-ui-react";
import DisplayLabel from "../display-label/DisplayLabel";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";
import ActionButtons from "../action-buttons/ActionButtons";
import { useState } from "react";
import { fetchUrl } from "../../urls/URLs";
import Swal from "sweetalert2";

const ClientRegistrationBody = ({ setCurrentMenu }) => {
  const initialState = {
    panNo: "",
    groupName: "",
    companyName: "",
    location: "",
  };
  const [clientData, setClientData] = useState(initialState);
  const inputChangeHandler = (e) => {
    setClientData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const saveBtnClickHandler = async () => {
    try {
      if (
        clientData.panNo.trim().length === 0 ||
        clientData.groupName.trim().length === 0 ||
        clientData.companyName.trim().length === 0 ||
        clientData.location.trim().length === 0
      ) {
        Swal.fire({
          title: "Please fill all the fields",
          text: "You are requested to fill all the input fields",
          icon: "warning",
          showCloseButton: true,
        });
        return;
      }
      // MAKING THE API REQUEST TO THE BACKEND TO SAVE THE CLIENT DATA
      Swal.showLoading();
      const resp = await fetch(`${fetchUrl}/clients/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });
      const data = await resp.json();
      console.log(data);
      Swal.hideLoading();
      Swal.fire({
        title: data.message,
        text: "Client added successfully",
        icon: "success",
        showConfirmButton: true,
        // timer:1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setCurrentMenu("Client List");
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
        showCloseButton: true,
      });
    }
  };
  const cancelBtnClickHandler = () => {
    setClientData(initialState);
  };
  return (
    <>
      <div className="client_body_common_section_styles">
        <div className="common_client_body_styles pan_number_section">
          <div>
            <FirstLetterColor letter={"P"} />
            <DisplayLabel label={"AN No."} />
          </div>
          <Input
            name={"panNo"}
            value={clientData.panNo}
            onChange={inputChangeHandler}
            style={{ width: "100%" }}
            placeholder={"PAN No."}
          />
        </div>
        <div className="common_client_body_styles group_name_section">
          <div>
            <FirstLetterColor letter={"G"} />
            <DisplayLabel label={"roup Name"} />
          </div>
          <Input
            name={"groupName"}
            value={clientData.groupName}
            onChange={inputChangeHandler}
            style={{ width: "100%" }}
            placeholder={"Group Name"}
          />
        </div>
        <div className="common_client_body_styles company_name_section">
          <div>
            <FirstLetterColor letter={"C"} />
            <DisplayLabel label={"ompany Name"} />
          </div>
          <Input
            name={"companyName"}
            value={clientData.companyName}
            onChange={inputChangeHandler}
            style={{ width: "100%" }}
            placeholder={"Company Name"}
          />
        </div>
      </div>
      <div
        style={{ marginTop: "1rem" }}
        className="client_body_common_section_styles"
      >
        <div className="common_client_body_styles location_section">
          <div>
            <FirstLetterColor letter={"L"} />
            <DisplayLabel label={"ocation"} />
          </div>
          <Input
            name={"location"}
            className="location"
            value={clientData.location}
            onChange={inputChangeHandler}
            placeholder={"Location"}
          />
        </div>
      </div>
      <div className="action_btn_container">
        <ActionButtons
          onSaveBtnClick={saveBtnClickHandler}
          onCancelBtnClick={cancelBtnClickHandler}
        />
      </div>
    </>
  );
};

export default ClientRegistrationBody;
