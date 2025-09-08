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
import { useFormValidation } from "../../../hooks/useFormValidations";

const MawbHawb = () => {
  console.count("MawbHawb");
  const clientNameRef = useRef(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const [mawbAction, setMawbAction] = useState("");
  const [exportData, setExportData] = useState(false);

  const [mawbDetailToEdit, setMawbDetailToEdit] = useState(null);

  const hawbOriginRefs = useRef({});
  const hawbDestinationRefs = useRef({});

  // console.log("hawbOriginRefs:", hawbOriginRefs);
  // console.log("hawbDestinationRefs:", hawbDestinationRefs);

  // useFetch() to save/update the Mawb and Hawb details into the database.
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
    setData: setAllMawbData,
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
  // console.log("hawbContainers: ", hawbContainers);

  useEffect(() => {
    setNoOfHawbContainers(
      mawbDetailToEdit?.hawbIds.length ? mawbDetailToEdit?.hawbIds.length : 1
    );
  }, [mawbDetailToEdit]);

  const addHawbContainer = (e) => {
    e.preventDefault();
    setNoOfHawbContainers((prev) => prev + 1);
  };

  const { mawbErrors, validateMawbFields } = useFormValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    // const formData = Object.fromEntries(fd.entries());
    const clientName = clientNameRef?.current.state?.value;
    const mawbNo = fd.get("mawbNo");
    const mawbOrigin = originRef.current?.state?.value;
    const mawbDestination = destinationRef.current?.state?.value;
    const totalNoOfPieces = fd.get("pieces");
    const grossWeight = fd.get("grossWeight");
    const isMawbValid = validateMawbFields({
      clientName,
      mawbNo,
      mawbOrigin,
      mawbDestination,
      totalNoOfPieces,
      grossWeight,
    });
    console.log("isMawbValid:", isMawbValid);
    if (!isMawbValid) {
      console.log("returning...");
      return;
    }
    // const hawbOrigin = hawbOriginRef.current?.state?.value;
    // const hawbDestinationRef = hawbDestinationRef.current?.state?.value;
    const mawbDetails = {
      clientName: clientNameRef?.current.state?.value,
      mawbNo: fd.get("mawbNo"),
      origin: originRef.current?.state?.value,
      destination: destinationRef.current?.state?.value,
      totalNoOfPieces: fd.get("pieces"),
      grossWeight: fd.get("grossWeight"),
    };
    const allHawbDetails = hawbContainers.map((container) => {
      if (!mawbDetailToEdit?._id) {
        // hawb details to save to the database
        return {
          hawbNo: fd.get(`hawbNo${container}`),
          origin:
            hawbOriginRefs.current[container]?.current?.state?.value || "",
          destination:
            hawbDestinationRefs.current[container]?.current?.state?.value || "",
          totalNoOfPieces: fd.get(`hawbPieces${container}`),
          grossWeight: fd.get(`hawbGrossWeight${container}`),
          commodity: fd.get(`hawbCommodity${container}`),
        };
      } else {
        // hawb details to update in the database
        return {
          ...mawbDetailToEdit.hawbIds[container - 1],
          hawbNo: fd.get(`hawbNo${container}`),
          origin:
            hawbOriginRefs.current[container]?.current?.state?.value || "",
          destination:
            hawbDestinationRefs.current[container]?.current?.state?.value || "",
          totalNoOfPieces: fd.get(`hawbPieces${container}`),
          grossWeight: fd.get(`hawbGrossWeight${container}`),
          commodity: fd.get(`hawbCommodity${container}`),
        };
      }
    });
    // console.log("mawbDetails:", mawbDetails);
    // console.log("allHawbDetails:", allHawbDetails);
    // Make API request to the backend to store both Mawb and Hawb details to the database
    if (!mawbDetailToEdit?._id) {
      const resp = await mawbSaveHandler(`${fetchUrl}/mawb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mawbDetails, allHawbDetails }),
      });
      setAllMawbData((prev) => {
        return [resp, ...prev];
      });
    } else {
      const resp = await mawbSaveHandler(
        `${fetchUrl}/mawb/${mawbDetailToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mawbDetails, allHawbDetails }),
        }
      );
      setAllMawbData((prev) => {
        return prev.map((detail) => {
          if (detail._id === resp._id) {
            return resp;
          } else {
            return detail;
          }
        });
      });
    }
    setExportData(true);
  };
  const handleShowDatatable = (e) => {
    e.preventDefault();
    setMawbAction("");
    setMawbDetailToEdit(null);
    setExportData(false);
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
          setAllMawbData={setAllMawbData}
          setMawbAction={setMawbAction}
          setMawbDetailToEdit={setMawbDetailToEdit}
        />
      )}

      {mawbAction && (
        <Form onSubmit={handleSubmit}>
          <MAWBDetails
            classname={"mawbdetails_flex_style"}
            mawbDetailToEdit={mawbDetailToEdit}
            errors={mawbErrors}
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
            <>
              {exportData ? (
                <CustomButton
                  btnClassname={"save_btn"}
                  btnContent={"Export"}
                  btnIcon={"download"}
                  iconPosition={"left"}
                  type="button"
                />
              ) : (
                <>
                  {!mawbDetailToEdit?._id ? (
                    <CustomButton
                      btnClassname={"save_btn"}
                      btnContent={"Save"}
                      btnIcon={"save"}
                      iconPosition={"left"}
                      type="submit"
                      disabled={mawbLoading}
                    />
                  ) : (
                    <CustomButton
                      btnClassname={"save_btn update_btn"}
                      btnContent={"Update"}
                      btnIcon={"pencil alternate"}
                      iconPosition={"left"}
                      type="submit"
                      disabled={mawbLoading}
                    />
                  )}
                </>
              )}
            </>
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
