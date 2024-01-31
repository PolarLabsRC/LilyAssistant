import { readText, writeText } from '@tauri-apps/api/clipboard';

export const getClipboard = async () => {
    return await readText();
}
export const setClipboard = async (text) => {
    await writeText(text);
}
