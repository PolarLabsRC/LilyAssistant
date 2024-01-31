import { openAIAPIKey } from "../stores/settings";
import { view } from "../stores/view";
import { OPTION_TYPE, OptionRecord } from "./options";
import { createDir, exists, readTextFile, writeFile, writeTextFile } from '@tauri-apps/api/fs';
import { path } from "@tauri-apps/api";
// TODO: Input is not reseting properly

const handleOptionCallback = async (key, input) => {
    try {
        writeToSettings(key, input.value);
        openAIAPIKey.set(input.value) // TODO: Loading from file here does not work at all, make custom action for this
        input.value = "";
    } catch (error) {
        console.error(`Failed to write to settings with key ${key}:`, error);
    }
};

export const apiSettingsOptions = [
    new OptionRecord({
        name: "OpenAI API key",
        description: "Change external API keys and URLs",
        type: OPTION_TYPE.input,
        callback: (input) => handleOptionCallback("openai-key", input)
    }),
    new OptionRecord({
        name: "Back",
        description: "Go back to settings",
        showIcon: false,
        callback: view.switchToSettings
    }),
];

const writeToSettings = async (key, value) => {
    const configFile = await path.join(await path.appConfigDir(), "config.json"); // TODO: change place of save
    try {
        let configExists = await exists(configFile);
        if (!configExists) {
            await createDir(await path.appConfigDir(), { recursive: true })
            await writeFile(configFile, "{}");
        }
        let configData = await readTextFile(configFile);
        let config = JSON.parse(configData);
        config[key] = value;
        let updatedConfigData = JSON.stringify(config, null, 2);
        await writeTextFile(configFile, updatedConfigData);
    } catch (error) {
        console.error("Cannot change settings", error);
    }
}