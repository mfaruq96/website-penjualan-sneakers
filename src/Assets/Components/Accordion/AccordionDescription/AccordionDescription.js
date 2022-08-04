import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "./AccordionDescription.css"


export const AccordionDescription = ({content}) => {
  return (
    <div>
      <Accordion style={{boxShadow:"none"}}>
        <AccordionSummary>
          <Typography style={{fontWeight:"bolder",fontSize:"20px"}}>Deskripsi</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {content}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
};
