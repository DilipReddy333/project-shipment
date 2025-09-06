import { useState } from "react";
import DisplayLabel from "../display-label/DisplayLabel";
import FirstLetterColor from "../first-letter-color/FirstLetterColor";
import DropdownComp from "../dropdown-component/DropdownComp";
import { fetchUrl } from "../../urls/URLs";
import debounce from "lodash.debounce";
import { MdKeyboardArrowDown } from "react-icons/md";

const LabelWithDropdown = () => {
  console.count("label with dropdown");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchGroupnames = async () => {
    console.log("fetching group names");
    try {
      setLoading(true);
      const resp = await fetch(`${fetchUrl}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setOptions(
        data.clients.map((item) => ({
          key: item.groupName,
          value: item.groupName,
          text: item.groupName,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchGroupnames = debounce(fetchGroupnames, 200);
  const handleOpen = () => {
    if (options.length === 0) {
      debouncedFetchGroupnames();
    }
  };

  return (
    <>
      <div className="group_name_container">
        <div>
          <FirstLetterColor letter={"G"} />
          <DisplayLabel label={"roup Name"} />
        </div>
        <DropdownComp
          placeholder={"--"}
          options={options}
          loading={loading}
          onOpen={handleOpen}
          selection={true}
          icon={<MdKeyboardArrowDown className="caret_down_icon" />}
          className={"groupname_dropdown_and_careticon"}
        />
      </div>
    </>
  );
};

export default LabelWithDropdown;
