use rodio::{Decoder, OutputStream, Sink, Source};
use std::{
    fs::File,
    io::{BufReader, Read},
    path::Path,
    thread,
};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn list_files(path: &str) -> Vec<String> {
    let paths = std::fs::read_dir(path).unwrap();
    let mut files = Vec::new();
    for path in paths {
        let path = path.unwrap().path();
        let path = path.to_str().unwrap().to_string();
        files.push(path);
    }
    return files;
}

#[tauri::command]
fn read_file_text(path: &str) -> String {
    return std::fs::read_to_string(path).unwrap();
}

#[tauri::command]
fn get_file_name(path: &str) -> String {
    return std::path::Path::new(path)
        .file_name()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string();
}

#[tauri::command]
fn isfile(path: &str) -> bool {
    if file_exists(path) {
        return std::fs::metadata(path).unwrap().is_file();
    } else {
        return false;
    }
}

#[tauri::command]
fn isfolder(path: &str) -> bool {
    return std::fs::metadata(path).unwrap().is_dir();
}

#[tauri::command]
fn file_exists(path: &str) -> bool {
    Path::new(path).exists()
}

#[tauri::command]
fn get_duration(path: &str) -> String {
    if let Ok(file) = File::open(path) {
        if let Ok(source) = Decoder::new(BufReader::new(file)) {
            return source
                .total_duration()
                .map(|d| d.as_secs().to_string())
                .unwrap_or("0".to_string());
        }
    }
    "Invalid".to_string()
}

#[tauri::command]
fn read_file(path: &str) -> Vec<u8> {
    let mut file = File::open(path).unwrap();
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).unwrap();
    return buffer;
}

#[tauri::command]
fn play_audio(path: &str) {
    let path = path.to_string();
    thread::spawn(move || {
        let (_stream, stream_handle) = OutputStream::try_default().unwrap();
        let file = File::open(&path).unwrap();
        let decoder = Decoder::new(BufReader::new(file)).unwrap();

        // Use Sink to manage playback without blocking the thread
        let sink = Sink::try_new(&stream_handle).unwrap();
        sink.append(decoder);

        // Wait for audio playback duration only if a valid duration is returned
        match get_duration(&path).as_str() {
            "Invalid" => eprintln!("Failed to get audio duration."),
            duration_str => {
                if let Ok(duration_secs) = duration_str.parse::<u64>() {
                    sink.sleep_until_end();
                } else {
                    eprintln!("Invalid duration format: {}", duration_str);
                }
            }
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            list_files,
            read_file_text,
            file_exists,
            get_file_name,
            isfolder,
            isfile,
            get_duration,
            read_file,
            play_audio
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
