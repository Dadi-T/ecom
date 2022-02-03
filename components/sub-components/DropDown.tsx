import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";
export default function DropDown() {
  const [selected, setSelected] = useState("");
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  return (
    <div>
      <Dropdown
        options={options}
        onChange={(evt) => {
          console.log(evt);
        }}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
}
