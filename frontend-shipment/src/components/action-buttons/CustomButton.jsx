import { Button } from "semantic-ui-react";

const CustomButton = ({
  btnClassname,
  btnContent,
  btnIcon,
  iconPosition,
  onClick,
}) => {
  return (
    <>
      <Button
        className={btnClassname}
        content={btnContent}
        icon={btnIcon}
        labelPosition={iconPosition}
        onClick={onClick}
      />
    </>
  );
};

export default CustomButton;
