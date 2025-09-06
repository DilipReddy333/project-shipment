import { FaFileAlt } from "react-icons/fa";
import { Container } from "semantic-ui-react";
import MAWBDetails from "./MAWBDetails";
import HAWBDetails from "./HAWBDetails";
import ShipmentHeader from "./shipment-header/ShipmentHeader";
import ClientRegistration from "./client-registration/ClientRegistration";
import ClientList from "./client-list/ClientList";

const ShipmentMainContainer = ({ currentMenu, setCurrentMenu }) => {
  return (
    <Container className="shipment_main_container">
      {currentMenu === "Full Shipment" && (
        <>
          <ShipmentHeader
            headerStyle={{ width: "100%", height: "100%" }}
            headerTitle={"Create Full Shipment Job"}
            headerIcon={
              <FaFileAlt
                style={{
                  width: "25px",
                  height: "23px",
                  paddingBottom: "3px",
                  color: "white",
                }}
              />
            }
          >
            <>
              <MAWBDetails classname={"mawbdetails_flex_style"} />
              <HAWBDetails classname={"hawbdetails_flex_style"} />
            </>
          </ShipmentHeader>
        </>
      )}
      {currentMenu === "Client Registration" && (
        <>
          <ClientRegistration setCurrentMenu={setCurrentMenu} />
        </>
      )}
      {currentMenu === "Client List" && (
        <>
          <ClientList />
        </>
      )}
    </Container>
  );
};

export default ShipmentMainContainer;
