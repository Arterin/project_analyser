// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use serde::Serialize;

#[derive(Serialize)]
struct OutputFields {
    integration: i32,
    scope: i32,
    schedule: i32,
    cost: i32,
    quality: i32,
    resource: i32,
    communications: i32,
    risk: i32,
    procurement: i32,
    stakeholder: i32,
    total: i32,
}

#[tauri::command]
fn score() {
    
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![score])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
