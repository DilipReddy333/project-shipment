import { FaFileAlt } from "react-icons/fa";
import { Container } from "semantic-ui-react";
import ShipmentHeader from "./shipment-header/ShipmentHeader";
import ClientRegistration from "./client-registration/ClientRegistration";
import ClientList from "./client-list/ClientList";
import MawbHawb from "./mawb-hawb/MawbHawb";

const ShipmentMainContainer = ({ currentMenu, setCurrentMenu }) => {
  return (
    <Container className="shipment_main_container">
      {currentMenu === "Full Shipment" && (
        <>
          <ShipmentHeader
            headerStyle={{ width: "100%", height: "100%" }}
            headerTitle={"Full Shipment"}
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
            {/* Need to show the table with MAWB details */}
            <>
              <MawbHawb />
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
          <ClientList setCurrentMenu={setCurrentMenu} />
        </>
      )}
    </Container>
  );
};

export default ShipmentMainContainer;
