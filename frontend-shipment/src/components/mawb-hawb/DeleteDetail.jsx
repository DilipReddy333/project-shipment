import { Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import { fetchUrl } from "../../urls/URLs";

const DeleteDetail = ({ id }) => {
  const deleteHandler = () => {
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
          const resp = await fetch(`${fetchUrl}/mawb/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          if (data.message) {
            Swal.hideLoading();
            setAllClients((prev) => {
              const updatedClients = prev?.clients?.filter(
                (client) => client._id !== clientId
              );
              return { clients: updatedClients };
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
      console.log("error in deleting the detail", error);
    }
  };
  return (
    <>
      <Button inverted color="red" onClick={deleteHandler} content="Delete" />
    </>
  );
};

export default DeleteDetail;
