import { writable } from "svelte/store";

export const VIEWS = Object.freeze({
    commandPalette: Symbol("commandPalette"),
    settings: Symbol("settings"),
    chat: Symbol("chat"),
    apiSettings: Symbol("apiSettings"),
  });
  

const createView = () => {
    const { subscribe, set } = writable(VIEWS.commandPalette);
  
    const switchToCommandPallete = () => {
      set(VIEWS.commandPalette);
    };
  
    const switchToSettings = () => {
      set(VIEWS.settings); 
    };
  
    const switchToChat = () => {
      set(VIEWS.chat); 
    };
    
    const switchToApiSettings = () => {
      set(VIEWS.apiSettings);
    }
  
    return { subscribe, switchToChat, switchToSettings, switchToCommandPallete, switchToApiSettings };
  };
  
  export const view = createView();
