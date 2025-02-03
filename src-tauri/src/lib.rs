use std::path::Path;

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
    return files
}

#[tauri::command]
fn read_file_text(path: &str) -> String {
    return std::fs::read_to_string(path).unwrap()
}

#[tauri::command]
fn get_file_name(path: &str) -> String {
    return std::path::Path::new(path).file_name().unwrap().to_str().unwrap().to_string()
}

#[tauri::command]
fn isfile(path: &str) -> bool {
    if file_exists(path) {
        let isFile = std::fs::metadata(path).unwrap().is_file();
        print!("\n is {} a file : {} \n",path,isFile);
       return isFile
    } else {
        print!("\n is {} a file : {} \n",path,false);
        return false;
    }
    
}

#[tauri::command]
fn isfolder(path: &str) -> bool {
    return std::fs::metadata(path).unwrap().is_dir()
}

#[tauri::command]
fn file_exists(path: &str) -> bool {
    Path::new(path).exists()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_files,read_file_text,file_exists,get_file_name,isfolder,isfile])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
