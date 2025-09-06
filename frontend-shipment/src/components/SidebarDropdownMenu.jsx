import { MdArrowForwardIos } from "react-icons/md";

const SidebarDropdownMenu = ({ dropdownMenu, className, menuClickHandler }) => {
  return (
    <div className={className} onClick={() => menuClickHandler(dropdownMenu)}>
      <MdArrowForwardIos style={{ width: "10px", height: "10px" }} />
      {dropdownMenu}
    </div>
  );
};

export default SidebarDropdownMenu;
