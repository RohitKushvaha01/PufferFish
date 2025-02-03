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
import Song from "./components/Song";
import { invoke } from "@tauri-apps/api/core";

const drawerWidth = 240;

const App = () => {
  const [files, setFiles] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Fetch the list of files
        const fileList = await invoke<string[]>("list_files", {
          path: "/home/rohit",
        });

        // Filter files asynchronously
        const validFiles = await Promise.all(
          fileList.map(async (file) => {
            const isValid = await invoke<boolean>("isfile", { path: file });
            return isValid && !file.startsWith(".") ? file : null; // Filter out non-files and hidden files
          })
        );

        // Now filter out `null` values (files that are not valid)
        const filteredFiles = validFiles.filter(
          (file) => file !== null
        ) as string[];

        // Map to get file names with async calls
        const moreValidFiles = await Promise.all(
          filteredFiles.map(async (file) => {
            const fileName = await invoke<string>("get_file_name", {
              path: file,
            });
            const isValid = await invoke<boolean>("isfile", { path: file });
            return fileName + " : " + isValid;
          })
        );

        setFiles(moreValidFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
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
        {files.length > 0 ? (
          files.map((file, index) => (
            <Song key={index} name={file} duration={"3:45"} />
          ))
        ) : (
          <p>Loading songs...</p>
        )}
      </Box>
    </div>
  );
};

export default App;
