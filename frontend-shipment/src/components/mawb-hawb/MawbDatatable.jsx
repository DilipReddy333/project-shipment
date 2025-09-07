import CustomButton from "../action-buttons/CustomButton";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
} from "semantic-ui-react";
import ErrorMessage from "../errorMessage/errorMessage";
import Legend from "../legend/Legend";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const MawbDatatable = ({
  details,
  loading,
  error,
  setMawbAction,
  setMawbDetailToEdit,
}) => {
  const addMawbDetailHandler = () => {
    setMawbAction("add");
    setMawbDetailToEdit(null);
  };
  const mawbEditHandler = (mawbDetail) => {
    setMawbAction("edit");
    setMawbDetailToEdit(mawbDetail);
  };
  return (
    <>
      <Legend legendName={"Full Shipment Data Table"}>
        {loading && <LoadingSpinner loadingMessage={"Fetching Details..."} />}
        {!error?.message && !loading && (
          <CustomButton
            btnClassname={"save_btn add_client add_mawb_button"}
            btnContent={"Add"}
            btnIcon={"plus"}
            iconPosition={"left"}
            onClick={addMawbDetailHandler}
          />
        )}
        {details?.length > 0 ? (
          <div className="client_list_container">
            <Table celled>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>MAWB No.</TableHeaderCell>
                  <TableHeaderCell>Client Name</TableHeaderCell>
                  <TableHeaderCell>Origin</TableHeaderCell>
                  <TableHeaderCell>Destination</TableHeaderCell>
                  <TableHeaderCell>Total Pieces</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details?.map((detail, i) => {
                  return (
                    <TableRow key={detail._id}>
                      <TableCell>{detail.mawbNo}</TableCell>
                      <TableCell>{detail.clientName}</TableCell>
                      <TableCell>{detail.origin}</TableCell>
                      <TableCell>{detail.destination}</TableCell>
                      <TableCell>{detail.totalNoOfPieces}</TableCell>
                      <TableCell>
                        <Button
                          inverted
                          onClick={() => mawbEditHandler(detail)}
                          color="teal"
                          content="Edit"
                        />
                        <Button
                          inverted
                          color="red"
                          onClick={() => {
                            console.log("Delete detail clicked");
                          }}
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
          <>
            {!error?.message ? (
              <h4>No Fullshipment Details</h4>
            ) : (
              <ErrorMessage errorMessage={error?.message} />
            )}
          </>
        )}
      </Legend>
    </>
  );
};

export default MawbDatatable;
