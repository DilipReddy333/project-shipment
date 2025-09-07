import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";
import DisplayLabel from "../display-label/DisplayLabel";
import CustomButton from "../action-buttons/CustomButton";
import { IoMdClose } from "react-icons/io";
import { fetchUrl } from "../../urls/URLs";

const EditClient = ({ clientId, setAllClients }) => {
  // console.count("edit client");

  const [open, setOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState({
    panNo: "",
    groupName: "",
    companyName: "",
    location: "",
  });

  const clientEditHandler = async (clientId) => {
    try {
      const resp = await fetch(`${fetchUrl}/clients/${clientId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      // console.log(data);
      setClientDetails((prev) => {
        return { ...prev, ...data };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (e) => {
    setClientDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clientUpdateHandler = async () => {
    try {
      const resp = await fetch(`${fetchUrl}/clients/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientDetails),
      });
      const data = await resp.json();
      // console.log(data);
      setAllClients((prev) => {
        return prev.map((client) => {
          if (client._id === data._id) {
            return data;
          } else {
            return client;
          }
        });
      });
      if (data) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer="blurring"
        trigger={
          <Button
            inverted
            onClick={() => {
              setOpen(true);
              clientEditHandler(clientId);
            }}
            color="teal"
            content="Edit"
          />
        }
      >
        <ModalHeader>Edit Client Details</ModalHeader>
        <ModalContent>
          <>
            <div className="client_body_common_section_styles">
              <div className="common_client_body_styles pan_number_section">
                <div>
                  <FirstLetterColor letter={"P"} />
                  <DisplayLabel label={"AN No."} />
                </div>
                <Input
                  name={"panNo"}
                  value={clientDetails.panNo}
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
                  style={{ width: "100%" }}
                  value={clientDetails.groupName}
                  onChange={inputChangeHandler}
                  placeholder={"Group Name"}
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
                  value={clientDetails.location}
                  onChange={inputChangeHandler}
                  className="location"
                  placeholder={"Location"}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="common_client_body_styles company_name_section">
                <div>
                  <FirstLetterColor letter={"C"} />
                  <DisplayLabel label={"ompany Name"} />
                </div>
                <Input
                  name={"companyName"}
                  value={clientDetails.companyName}
                  onChange={inputChangeHandler}
                  style={{ width: "100%" }}
                  placeholder={"Company Name"}
                />
              </div>
            </div>
            {/* <div className="action_btn_container">
              <ActionButtons
                onSaveBtnClick={saveBtnClickHandler}
                onCancelBtnClick={cancelBtnClickHandler}
              />
            </div> */}
          </>
        </ModalContent>
        <ModalActions>
          <CustomButton
            btnClassname={"save_btn update_btn"}
            btnContent={"Update"}
            btnIcon={"pencil alternate"}
            iconPosition={"left"}
            onClick={clientUpdateHandler}
          />
          <CustomButton
            btnClassname="cancel_btn"
            btnContent="Cancel"
            onClick={() => setOpen(false)}
            btnIcon={
              <IoMdClose
                style={{
                  fontSize: "1.3rem",
                  position: "absolute",
                  left: "15px",
                  top: "9px",
                  bottom: 0,
                }}
              />
            }
            iconPosition="left"
          />
        </ModalActions>
      </Modal>
    </>
  );
};

export default EditClient;
