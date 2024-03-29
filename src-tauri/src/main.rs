// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct OutputFields {
    integration: f64,
    scope: f64,
    schedule: f64,
    cost: f64,
    quality: f64,
    resource: f64,
    communications: f64,
    risk: f64,
    procurement: f64,
    stakeholder: f64,
    total: f64,
}

struct Weights {
    integration: f64,
    scope: f64,
    schedule: f64,
    cost: f64,
    quality: f64,
    resource: f64,
    communications: f64,
    risk: f64,
    procurement: f64,
    stakeholder: f64
}

impl Default for Weights {
    fn default() -> Self {
        Weights {
            integration: 0.16084,
            scope: 0.09231,
            schedule: 0.03077,
            cost: 0.03497,
            quality: 0.14126,
            resource: 0.06853,
            communications: 0.12448,
            risk: 0.15944,
            procurement: 0.05035,
            stakeholder: 0.13706,
        }
    }
}


#[tauri::command]
fn score(data: OutputFields) -> OutputFields {
    let weights = Weights::default();
    let mut scores = OutputFields {
        integration: data.integration * weights.integration,
        scope: data.scope * weights.scope,
        schedule: data.schedule * weights.schedule,
        cost: data.cost * weights.cost,
        quality: data.quality * weights.quality,
        resource: data.resource * weights.resource,
        communications: data.communications * weights.communications,
        risk: data.risk * weights.risk,
        procurement: data.procurement * weights.procurement,
        stakeholder: data.stakeholder * weights.stakeholder,
        total: 0.0
    };

    scores.total = scores.integration
        + scores.scope
        + scores.schedule
        + scores.cost
        + scores.quality
        + scores.resource
        + scores.communications
        + scores.risk
        + scores.procurement
        + scores.stakeholder;
    
    scores
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![score])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
