import { path } from "@tauri-apps/api";
import { readTextFile } from "@tauri-apps/api/fs";
import { get, writable } from "svelte/store";


const createOpenAIAPIKey = () => {
    const { subscribe, set, update } = writable("");
    const reset = () => {
        set("");
    };

    const loadFromConfig = async () => {
        const configFile = await path.join(await path.appConfigDir(), "config.json");
        try {
            const data = await readTextFile(configFile);
            const json = JSON.parse(data);
            set(json["openai-key"]);
        } catch (error) {
            console.warn("Config does not exist.");
        }
    };

    return { subscribe, set, update, reset, loadFromConfig }
};
const openAIAPIKey = createOpenAIAPIKey();
openAIAPIKey.loadFromConfig();

export { openAIAPIKey }

const createAdvancedPropmpt = () => {
    const { subscribe, set, update } = writable(false);
    const togglePrompt = () => {
        update((p) => {
            return !p;
        });
    };

    return { subscribe, set, update, togglePrompt }
};
const advancedPropmpt = createAdvancedPropmpt();
export { advancedPropmpt }

