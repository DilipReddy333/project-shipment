import { FaUser } from "react-icons/fa6";
import ShipmentHeader from "../shipment-header/ShipmentHeader";
import Legend from "../legend/Legend";
import { useState, useEffect } from "react";
import { fetchUrl } from "../../urls/URLs";
import Swal from "sweetalert2";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
} from "semantic-ui-react";
import EditClient from "../edit-client-modal/EditClient";

const ClientList = () => {
  const [allClients, setAllClients] = useState([]);

  // use effect to get all the clients data from backend
  useEffect(() => {
    const getAllClients = async () => {
      try {
        const resp = await fetch(`${fetchUrl}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();
        if (data.clients?.length !== 0) {
          setAllClients(data.clients);
        }
      } catch (error) {
        console.log(error);
        // Swal.fire({
        //   title: error.message,
        //   icon: "error",
        //   showConfirmButton: true,
        // });
      }
    };
    getAllClients();
  }, []);
  // client delete handler
  const clientDeleteHandler = async (clientId) => {
    // console.log(clientId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.showLoading();
          const resp = await fetch(`${fetchUrl}/delete/${clientId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (data.message) {
            Swal.hideLoading();
            setAllClients((prev) => {
              return prev.filter((client) => client._id !== clientId);
            });
            Swal.fire({
              title: data.message,
              text: "Client deleted successfully",
              icon: "success",
              showConfirmButton: true,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.count("client list");
  return (
    <>
      <ShipmentHeader
        headerStyle={{ width: "100%", height: "fit-content" }}
        headerTitle={"Client List"}
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
      >
        <Legend legendName={"Search Client"}>Search client</Legend>
        <Legend legendName={"Client List"}>
          {allClients?.length > 0 ? (
            <div className="client_list_container">
              <Table celled>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>SNo.</TableHeaderCell>
                    <TableHeaderCell>Group Name</TableHeaderCell>
                    <TableHeaderCell>Company Name</TableHeaderCell>
                    <TableHeaderCell>Location</TableHeaderCell>
                    <TableHeaderCell>PAN No.</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allClients?.map((client, i) => {
                    return (
                      <TableRow key={client._id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{client.groupName}</TableCell>
                        <TableCell>{client.companyName}</TableCell>
                        <TableCell>{client.location}</TableCell>
                        <TableCell>{client.panNo}</TableCell>
                        <TableCell>
                          <EditClient
                            clientId={client._id}
                            setAllClients={setAllClients}
                          />{" "}
                          <Button
                            inverted
                            color="red"
                            onClick={() => clientDeleteHandler(client._id)}
                            content="Delete"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <h4>No Clients Added</h4>
          )}
        </Legend>
      </ShipmentHeader>
    </>
  );
};

export default ClientList;
