import { invoke } from "@tauri-apps/api/core";

async function getSongs() {
  const fileList = await invoke<string[]>("list_files", {
    path: "/home/rohit/Music",
  });

  const validFiles = await Promise.all(
    fileList.map(async (file) => {
      const isValid = await invoke<boolean>("isfile", { path: file });
      return (file.endsWith("mp3") ||
        file.endsWith("m4a") ||
        file.endsWith("mp4") ||
        file.endsWith("ogg") ||
        file.endsWith("wav")) &&
        !file.startsWith(".") &&
        isValid
        ? file
        : null;
    })
  );

  const filteredFiles = validFiles.filter((file) => file !== null) as string[];

  const fileDetails = await Promise.all(
    filteredFiles.map(async (filePath) => {
      const fileName = await invoke<string>("get_file_name", {
        path: filePath,
      });
      const duration = await invoke<string>("get_duration", {
        path: filePath,
      });

      return {
        path: filePath,
        name: fileName,
        duration: getDurationHumanReadble(duration),
      };
    })
  );

  return fileDetails;
}

function getDurationHumanReadble(secondsStr: string) {
  if (secondsStr === "Invalid") {
    return "Invalid";
  }

  const seconds = parseInt(secondsStr, 10);
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}

export { getSongs };
