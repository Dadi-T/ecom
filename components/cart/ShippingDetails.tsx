import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

//components
import AccordianAction from "../sub-components/AccordianAction";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FB784C",
  },
  "&.MuiFilledInput-underline:after": {
    borderBottomColor: "#FB784C",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#FB784C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FB784C",
    },
  },
});
// grid grid-cols-2 gap-y-8 gap-x-2
export default function ShippingDetails() {
  return (
    <div>
      <AccordianAction title="Shipping Details">
        <section className="grid grid-cols-2 gap-4">
          <CssTextField required placeholder="Address Line" />
          <CssTextField required placeholder="Country" />
          <CssTextField required placeholder="City" />
          <CssTextField required placeholder="Zip Code" />
          <CssTextField required placeholder="Full Name" />
        </section>
      </AccordianAction>
    </div>
  );
}
