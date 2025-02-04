import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import * as Icons from "@mui/icons-material";

interface CardButtonProps {
  text: string;
}

const CardButton: React.FC<CardButtonProps> = ({ text }) => {
  return (
    <ListItemButton
      sx={{
        borderRadius: "8px",
        marginLeft: "8px",
        marginRight: "8px",
      }}
    >
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default CardButton;
