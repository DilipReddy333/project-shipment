import CustomButton from "./CustomButton";
import { IoMdClose } from "react-icons/io";

const ActionButtons = ({ onSaveBtnClick, onCancelBtnClick }) => {
  return (
    <>
      <CustomButton
        btnClassname={"save_btn"}
        btnContent={"Save"}
        btnIcon={"save"}
        iconPosition={"left"}
        onClick={onSaveBtnClick}
      />
      <CustomButton
        btnClassname="cancel_btn"
        btnContent="Cancel"
        onClick={onCancelBtnClick}
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
    </>
  );
};

export default ActionButtons;
