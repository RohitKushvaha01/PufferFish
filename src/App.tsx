import * as React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
  Card,
} from "@mui/material";

import * as Icons from "@mui/icons-material";
import Song from "./components/Song";
import { invoke } from "@tauri-apps/api/core";
import CardButton from "./components/CardButton";
import { getSongs } from "./Songs";

import * as fs from "@tauri-apps/plugin-fs";

const drawerWidth = 240;

const App = () => {
  const [files, setFiles] = React.useState<
    { path: string; name: string; duration: String }[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileDetails = await getSongs();

        setFiles(fileDetails);
      } catch (error) {
        alert("Error fetching files \n" + error);
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

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
          <ListItemButton
            key={"Music"}
            sx={{
              borderRadius: "8px",
              marginLeft: "8px",
              marginRight: "8px",
            }}
          >
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
        {loading ? (
          <CardButton text={"Loading Songs..."} />
        ) : files.length > 0 ? (
          files.map((file, index) => (
            <Song
              key={index}
              name={file.name}
              duration={file.duration.valueOf()}
              onClick={() => {
                invoke("play_audio", { path: file.path });
              }}
            />
          ))
        ) : (
          <CardButton text={"No Songs Found"} />
        )}
      </Box>
    </div>
  );
};

export default App;
