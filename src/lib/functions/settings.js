import ApiSettingsIcon from "../images/apiSettings.svg";
import LLMIcon from "../images/llm.svg";
import PromptIcon from "../images/prompt.svg";
import BackIcon from "../images/back.svg";
import { view } from "../stores/view";
import { OPTION_TYPE, OptionRecord } from "./options";
import { textInput } from "../stores/textInput";
import { advancedPropmpt } from "../stores/settings";

export const settingsOptions = [
    new OptionRecord({
        name: "API settings",
        description: "Change external API keys and URLs",
        icon: ApiSettingsIcon,
        callback: () => {
            view.switchToApiSettings();
            textInput.reset()
        }
    }),
    new OptionRecord({
        name: "Advanced prompt",
        description: "Improves experience but increases costs (will change after conversation reset)",
        icon: PromptIcon,
        type: OPTION_TYPE.flag, 
        status: advancedPropmpt,
        callback: () => {
            advancedPropmpt.togglePrompt();
        }
    }),
    new OptionRecord({
        name: "LLM (comming soon)",
        description: "Set LLM you want to use",
        icon: LLMIcon,
        callback: () => {
            view.switchToApiSettings();
            textInput.reset()
        }
    }),
    new OptionRecord({
        name: "Back",
        description: "Go back to command palette",
        icon: BackIcon,
        callback: view.switchToCommandPallete
    })
]