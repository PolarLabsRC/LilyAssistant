// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate x11;
use x11::xlib;
use std::ptr;
use std::process;

// Global variable to store window_id

fn get_window_pid(display: *mut xlib::Display, window: xlib::Window) -> Option<i32> {
    let mut actual_type: xlib::Atom = 0;
    let mut actual_format: i32 = 0;
    let mut nitems: u64 = 0;
    let mut bytes_after: u64 = 0;
    let mut prop: *mut u8 = ptr::null_mut();

    unsafe {
        if xlib::XGetWindowProperty(
            display,
            window,
            xlib::XInternAtom(display, "_NET_WM_PID\0".as_ptr() as *const i8, xlib::False),
            0,
            1,
            xlib::False,
            xlib::XA_CARDINAL,
            &mut actual_type,
            &mut actual_format,
            &mut nitems,
            &mut bytes_after,
            &mut prop,
        ) == xlib::Success as i32
        {
            if actual_format == 32 && nitems == 1 {
                let pid = *(prop as *const i32);
                xlib::XFree(prop as *mut std::ffi::c_void);
                return Some(pid);
            }
        }
    }

    None
}

#[tauri::command]
fn focus_window() {
    let display = unsafe { xlib::XOpenDisplay(ptr::null()) };
    if display.is_null() {
        panic!("Failed to open display");
    }

    // Get the root window
    let root_window = unsafe { xlib::XDefaultRootWindow(display) };

    // Get all window IDs using XQueryTree
    let mut root_return: xlib::Window = 0;
    let mut parent_return: xlib::Window = 0;
    let mut children: *mut xlib::Window = ptr::null_mut();
    let mut nchildren = 0;

    if unsafe {
        xlib::XQueryTree(
            display,
            root_window,
            &mut root_return,
            &mut parent_return,
            &mut children,
            &mut nchildren,
        )
    } == 0
    {
        panic!("Failed to query tree");
    }

    let target_pid = process::id() as i32;

    let window_id = if children.is_null() || nchildren == 0 {
        None
    } else {
        let filtered_ids: Vec<xlib::Window> = unsafe {
            std::slice::from_raw_parts(children, nchildren as usize)
                .iter()
                .filter_map(|&window| get_window_pid(display, window).filter(|&pid| pid == target_pid).map(|_| window))
                .collect()
        };
    
        unsafe { xlib::XFree(children as *mut std::ffi::c_void) };
    
        filtered_ids.last().cloned()
    };

    if let Some(window_id) = window_id {
        println!("Focusing window: {:?}", window_id);
        unsafe {
            xlib::XSetInputFocus(display, window_id, xlib::RevertToParent, xlib::CurrentTime);
        }
    } else {
        println!("No matching window found");
    }

    unsafe {
        xlib::XCloseDisplay(display);
    }
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![focus_window])
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
