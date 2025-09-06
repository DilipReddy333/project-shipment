import { Input } from "semantic-ui-react";
import DisplayLabel from "./display-label/DisplayLabel";
import FirstLetterColor from "./first-letter-color/FirstLetterColor";

const Commodity = () => {
  return (
    <>
      <div className="commodity_container">
        <div>
          <FirstLetterColor letter={"C"} />
          <DisplayLabel label={"ommodity"} />
        </div>
        <Input placeholder="Commodity" className="commodity_input_field" />
      </div>
    </>
  );
};

export default Commodity;
