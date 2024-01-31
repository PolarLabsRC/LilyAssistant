import { writable } from "svelte/store";


const createTextInput = () => {
    const { subscribe, set, update } = writable("");
    const reset = () => {
        set("")
    }
    return { subscribe, set, update, reset }
}

export const textInput = createTextInput()