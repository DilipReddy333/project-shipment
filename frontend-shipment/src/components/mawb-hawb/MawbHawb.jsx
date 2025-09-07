import { Form } from "semantic-ui-react";
import CustomButton from "../action-buttons/CustomButton";
import HAWBDetails from "../HAWBDetails";
import MAWBDetails from "../MAWBDetails";
import { IoMdClose } from "react-icons/io";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { fetchUrl } from "../../urls/URLs";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import ErrorMessage from "../errorMessage/errorMessage";
import MawbDatatable from "./MawbDatatable";

const MawbHawb = () => {
  console.count("MawbHawb");
  const clientNameRef = useRef(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const [mawbAction, setMawbAction] = useState("");

  const [mawbDetailToEdit, setMawbDetailToEdit] = useState(null);

  const hawbOriginRefs = useRef({});
  const hawbDestinationRefs = useRef({});

  // console.log("hawbOriginRefs:", hawbOriginRefs);
  // console.log("hawbDestinationRefs:", hawbDestinationRefs);

  // useFetch() to save the Mawb and Hawb details into the database.
  const {
    loading: mawbLoading,
    data: mawbData,
    error: mawbError,
    makeHttpRequest: mawbSaveHandler,
  } = useFetch();

  // useFetch() to get the details of Mawb details from the database.
  const {
    loading: mawbFetchLoader,
    data: AllMawbData,
    error: mawbFetchError,
    makeHttpRequest: mawbFetchHandler,
  } = useFetch();
  useEffect(() => {
    const getAllMawbAndHawbDetails = async () => {
      await mawbFetchHandler(`${fetchUrl}/mawb`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    getAllMawbAndHawbDetails();
  }, []);

  const [noOfHawbContainers, setNoOfHawbContainers] = useState(1);
  const createArray = useCallback((N) => {
    return [...Array(N).keys()].map((i) => i + 1);
  }, []);
  const hawbContainers = createArray(noOfHawbContainers);
  console.log("hawbContainers: ", hawbContainers);

  useEffect(() => {
    setNoOfHawbContainers(
      mawbDetailToEdit?.hawbIds.length ? mawbDetailToEdit?.hawbIds.length : 1
    );
  }, [mawbDetailToEdit]);

  const addHawbContainer = (e) => {
    e.preventDefault();
    setNoOfHawbContainers((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    // const formData = Object.fromEntries(fd.entries());
    // formData.clientName = clientNameRef?.current.state?.value;
    // formData.mawbOrigin = originRef.current?.state?.value;
    // formData.mawbDestination = destinationRef.current?.state?.value;
    // formData.hawbOrigin = hawbOriginRef.current?.state?.value;
    // formData.hawbDestinationRef = hawbDestinationRef.current?.state?.value;
    const mawbDetails = {
      clientName: clientNameRef?.current.state?.value,
      mawbNo: fd.get("mawbNo"),
      origin: originRef.current?.state?.value,
      destination: destinationRef.current?.state?.value,
      totalNoOfPieces: fd.get("pieces"),
      grossWeight: fd.get("grossWeight"),
    };
    const allHawbDetails = hawbContainers.map((container) => {
      return {
        hawbNo: fd.get(`hawbNo${container}`),
        origin: hawbOriginRefs.current[container]?.current?.state?.value || "",
        destination:
          hawbDestinationRefs.current[container]?.current?.state?.value || "",
        totalNoOfPieces: fd.get(`hawbPieces${container}`),
        grossWeight: fd.get(`hawbGrossWeight${container}`),
        commodity: fd.get(`hawbCommodity${container}`),
      };
    });
    // console.log("mawbDetails:", mawbDetails);
    // console.log("allHawbDetails:", allHawbDetails);
    // Make API request to the backend to store both Mawb and Hawb details to the database
    await mawbSaveHandler(`${fetchUrl}/mawb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mawbDetails, allHawbDetails }),
    });
  };
  const handleShowDatatable = (e) => {
    e.preventDefault();
    setMawbAction("");
    setMawbDetailToEdit(null);
    // const form = e.target.closest("form");
    // if (form) form.reset();
    // if (clientNameRef.current) clientNameRef.current.clearValue();
    // if (originRef.current) originRef.current.clearValue();
    // if (destinationRef.current) destinationRef.current.clearValue();
    // hawbContainers.forEach((container) => {
    //   hawbOriginRefs.current[container]?.current?.clearValue();
    //   hawbDestinationRefs.current[container]?.current?.clearValue();
    // });
    // if (hawbOriginRef.current) hawbOriginRef.current.clearValue();
    // if (hawbDestinationRef.current) hawbDestinationRef.current.clearValue();
  };
  // if (loading) {
  //   return <LoadingSpinner loadingMessage={"Saving..."} />;
  // }
  // if (error?.message) {
  //   return <ErrorMessage errorMessage={error?.message} />;
  // }
  // if (mawbData) {
  //   console.log("mawbData:", mawbData);
  // }
  // if (AllMawbData) {
  //   console.log("AllMawbData:", AllMawbData);
  // }
  console.log("mawbDetailToEdit:", mawbDetailToEdit);
  return (
    <>
      {mawbLoading && <LoadingSpinner loadingMessage={"Saving..."} />}

      {mawbError?.message && <ErrorMessage errorMessage={mawbError?.message} />}

      {/* Mawb Data Table */}
      {mawbAction !== "edit" && mawbAction !== "add" && (
        <MawbDatatable
          details={AllMawbData}
          loading={mawbFetchLoader}
          error={mawbFetchError}
          setMawbAction={setMawbAction}
          setMawbDetailToEdit={setMawbDetailToEdit}
        />
      )}

      {mawbAction && (
        <Form onSubmit={handleSubmit}>
          <MAWBDetails
            classname={"mawbdetails_flex_style"}
            mawbDetailToEdit={mawbDetailToEdit}
            clientNameRef={clientNameRef}
            originRef={originRef}
            destinationRef={destinationRef}
          />
          <>
            {hawbContainers?.map((container) => {
              // create refs for each container
              if (!hawbOriginRefs.current[container]) {
                hawbOriginRefs.current[container] = React.createRef();
              }
              if (!hawbDestinationRefs.current[container]) {
                hawbDestinationRefs.current[container] = React.createRef();
              }
              return (
                <HAWBDetails
                  key={container}
                  container={container}
                  mawbDetailToEdit={mawbDetailToEdit}
                  classname={"hawbdetails_flex_style"}
                  addHawbContainer={addHawbContainer}
                  hawbOriginRef={hawbOriginRefs.current[container]}
                  hawbDestinationRef={hawbDestinationRefs.current[container]}
                />
              );
            })}
          </>

          <div style={{ textAlign: "right" }}>
            <CustomButton
              btnClassname={"save_btn"}
              btnContent={"Save"}
              btnIcon={"save"}
              iconPosition={"left"}
              onClick={() => {
                console.log("Save button clicked");
              }}
            />
            <CustomButton
              btnClassname="cancel_btn"
              btnContent="Cancel"
              onClick={handleShowDatatable}
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
          </div>
        </Form>
      )}
    </>
  );
};

export default MawbHawb;
