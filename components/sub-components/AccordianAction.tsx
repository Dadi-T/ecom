import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//react
import { useState } from "react";
export default function AccordianAction(props: any) {
  const [expandState, setExpandState] = useState();
  return (
    <div className="my-4">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <h3 className="font-semibold">{props.title}</h3>
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
