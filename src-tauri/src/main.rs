// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, PhysicalPosition, Position, WebviewWindowBuilder, WebviewUrl, WindowEvent, WebviewWindow, Emitter};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  duration: String,
}

fn main() {
  tauri::Builder::default()
  .setup(|app| {
    // Retrieve or create the floating window
    if app.get_webview_window("floating").is_none() {
      let floating_window = WebviewWindowBuilder::new(
        app,
        "floating",
        WebviewUrl::App("/about".into())  // Ensure this route matches your frontend route
      )
      .title("Floating Window")
      .always_on_top(true)
      .inner_size(200.0, 100.0)
      .visible(false)  // Initially hidden
      .build()
      .expect("Failed to build floating window");
      
      floating_window.set_position(Position::Physical(PhysicalPosition { x: 0, y: 0 }))
      .unwrap();
      
      // Handle the close event to hide the window instead of closing it
      let floating_window_clone = floating_window.clone();
      floating_window.on_window_event(move |event| {
        if let WindowEvent::CloseRequested { api, .. } = event {
          api.prevent_close();  // Prevent the window from actually closing
          floating_window_clone.hide().expect("Failed to hide floating window");  // Hide the window instead
        }
      });
      
    } else {
    }
    
    // listen to the `forward-duration-to-floating-window` (emitted on any window)
    // let id = floating_window.listen_global("forward-duration-to-floating-window", |event| {
      // });
      // unlisten to the event using the `id` returned on the `listen_global` function
      // a `once_global` API is also exposed on the `App` struct
      // floating_window.unlisten(id);
      
    
      Ok(())
  })
  .invoke_handler(tauri::generate_handler![show_floating_window, duration])
  .plugin(tauri_plugin_sql::Builder::default().build())
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}

#[tauri::command]
fn show_floating_window(app_handle: tauri::AppHandle, duration:String) {
  if let Some(window) = app_handle.get_webview_window("floating") {
    // Pass the duration to the floating window using custom attributes
    // window.set_attribute("duration", duration.to_string()).expect("Failed to set duration attribute for floating window");
    // emit the `forward-duration-to-floating-window` event to all webview windows on the frontend
    let floating_window = app_handle.get_webview_window("floating").unwrap();
    floating_window.emit("duration", Payload { duration: duration.into() }).unwrap();
    window.show().expect("Failed to show floating window");
    window.set_focus().expect("Failed to set focus to floating window");
  } else {
  }
}

#[tauri::command]
fn duration(window: WebviewWindow) {
  std::thread::spawn(move || {
    loop {
      window.emit("duration", Payload { duration: "".into() }).unwrap();
    }
  });
}