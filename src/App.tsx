import * as React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import Song from "./components/song";
import { invoke } from "@tauri-apps/api/core";

const drawerWidth = 240;

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItemButton key={"Music"}>
            <ListItemIcon>
              <Icons.MusicNoteOutlined />
            </ListItemIcon>
            <ListItemText primary={"Music"} />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          minHeight: "100vh",
        }}
      >
        <Song name="Example Song" author="Author Name" duration="3:45" />
      </Box>
    </div>
  );
};

export default App;
