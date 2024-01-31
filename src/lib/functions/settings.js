import ApiSettingsIcon from "../images/apiSettings.svg"
import BackIcon from "../images/back.svg"
import { view } from "../stores/view";
import { OptionRecord } from "./options";


export const settingsOptions = [
    new OptionRecord({
        name: "API settings",
        description: "Change external API keys and URLs",
        icon: ApiSettingsIcon,        
        callback: view.switchToApiSettings
    }),
    new OptionRecord({
        name: "Back",
        description: "Go back to command palette",
        icon: BackIcon,    
        callback: view.switchToCommandPallete
    })
]
