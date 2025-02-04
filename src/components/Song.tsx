import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import * as Icons from "@mui/icons-material";

interface SongProps {
  name: string;
  duration: string;
  onClick?: () => void;
}

const Song: React.FC<SongProps> = ({ name, duration, onClick }) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: "8px",
        marginLeft: "8px",
        marginRight: "8px",
      }}
    >
      <ListItemIcon>
        <Icons.MusicNoteOutlined />
      </ListItemIcon>
      <ListItemText primary={name} />
      <div style={{ textAlign: "right" }}>{duration}</div>{" "}
    </ListItemButton>
  );
};

export default Song;
