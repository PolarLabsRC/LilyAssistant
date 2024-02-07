import { appWindow } from "@tauri-apps/api/window";
import { register, isRegistered } from '@tauri-apps/api/globalShortcut';
import { invoke } from '@tauri-apps/api/tauri';
import { textInput } from "../stores/textInput";
import { view } from "../stores/view";

const OPEN_COMMAND_PALETTE = "Alt+Q";
const OPEN_CHAT = "Alt+W";

const CLOSE = "Esc";

export const hideWindow = () => {
    view.switchToCommandPallete();
    textInput.reset()
    appWindow.hide();
};

const onFocusChangedHandler = async (element, focused) => {
    if (!focused) {
        hideWindow();
    } else {
        element.focus();
    }
};

export const closeOnFocusLost = async (element) => {
    await appWindow.onFocusChanged(({ payload: focused }) => onFocusChangedHandler(element, focused));
};

export const openOnShortcut = async () => {
    appWindow.setAlwaysOnTop(true);

    if (await isRegistered(OPEN_COMMAND_PALETTE) && await isRegistered(CLOSE)) {
        return;
    }

    await register(OPEN_COMMAND_PALETTE, () => {
        appWindow.show();
        appWindow.setAlwaysOnTop(true);
        appWindow.center();

        setTimeout(() => {
            appWindow.setFocus();
            invoke("focus_window");
        }, 100);
    });

    await register(OPEN_CHAT, () => {
        view.switchToChat()
        appWindow.show();
        appWindow.setAlwaysOnTop(true);
        appWindow.center();

        setTimeout(() => {
            appWindow.setFocus();
            invoke("focus_window");
        }, 100);
    });

    await register(CLOSE, () => hideWindow());
};

export const setupWindow = () => {
    appWindow.center();
    appWindow.setSkipTaskbar(true);
};
