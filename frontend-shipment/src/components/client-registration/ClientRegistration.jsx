import { FaUser } from "react-icons/fa6";
import ShipmentHeader from "../shipment-header/ShipmentHeader";
import Legend from "../legend/Legend";
import { Card, CardContent } from "semantic-ui-react";
import ClientRegistrationBody from "./ClientRegistrationBody";

const ClientRegistration = ({ setCurrentMenu }) => {
  return (
    <>
      <ShipmentHeader
        headerStyle={{ width: "100%", height: "fit-content" }}
        headerTitle={"Client Registration"}
        headerDesc={"New Registration Of Client"}
        headerIcon={
          <FaUser
            style={{
              width: "25px",
              height: "23px",
              paddingBottom: "3px",
              color: "white",
            }}
          />
        }
      ></ShipmentHeader>
      <Card style={{ width: "100%" }}>
        <CardContent style={{ paddingInline: "0.7rem", paddingBlock: "0px" }}>
          <Legend legendName={"Company Details"}>
            <div
              className="client_registration_body"
              style={{ marginInline: "0.5rem" }}
            >
              <ClientRegistrationBody setCurrentMenu={setCurrentMenu} />
            </div>
          </Legend>
        </CardContent>
      </Card>
    </>
  );
};

export default ClientRegistration;
