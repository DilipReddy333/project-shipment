import { Dropdown } from "semantic-ui-react";

const DropdownComp = ({
  placeholder,
  options,
  selection,
  icon,
  className,
  style,
  onOpen,
  loading,
}) => {
  return (
    <Dropdown
      placeholder={placeholder}
      options={options}
      selection={selection}
      loading={loading}
      icon={icon}
      className={className}
      onOpen={onOpen}
      style={{ ...style }}
    />
  );
};

export default DropdownComp;
