<script>
    import { onMount } from "svelte";
    import { commandPaletteOptions } from "./lib/functions/commandPalette";
    import StatusBar from "./lib/components/StatusBar.svelte";
    import OptionList from "./lib/components/OptionList.svelte";
    import { textInput } from "./lib/stores/textInput";
    import { VIEWS, view } from "./lib/stores/view"
    import {
        closeOnFocusLost,
        openOnShortcut,
        setupWindow,
    } from "./lib/functions/window"; 
    import ChatView from "./lib/views/ChatView.svelte";
    import SettingsView from "./lib/views/SettingsView.svelte";
    import ApiSettingsView from "./lib/views/ApiSettingsView.svelte"
    import { settingsOptions } from "./lib/functions/settings";
    import { openAIAPIKey } from "./lib/stores/settings";
    import { get } from "svelte/store";
    import { Command } from "@tauri-apps/api/shell";
    
    let textarea;

    $: settingsActive = (() => $view === VIEWS.settings)();
    $: commandPaletteActive = (() => $view === VIEWS.commandPalette)();
    $: chatActive = (() => $view === VIEWS.chat)();
    $: apiSettingsActive = (() => $view === VIEWS.apiSettings)();
    
    onMount(async () => {

        setupWindow();
        await openOnShortcut();
        await closeOnFocusLost(textarea);
    });
    //TODO: no newline interpretation 

</script>

<main class="main text-zinc-100">
    <!-- Dialog -->
    <ApiSettingsView active={apiSettingsActive}></ApiSettingsView>
    
    <!-- Chat -->
    <ChatView active={chatActive}></ChatView>

    <!-- Settings -->
    <SettingsView active={settingsActive}></SettingsView>

    <!-- Input -->
    <div
        class="flex transition-opacity {settingsActive || apiSettingsActive
            ? 'opacity-0'
            : 'opacity-100'}"
    >
        <div
            class="flex w-12 items-center justify-center bg-teal-600 text-center font-semibold"
        >
            <div>#</div>
        </div>
        <!-- TODO: reset active options in state -->
        <textarea
            bind:this={textarea}
            bind:value={$textInput}
            autofocus
            placeholder="Ask me anything..."
            class="w-full resize-none bg-zinc-700 p-3.5 outline-none"
            name="prompt"
            rows="1"
        ></textarea>
    </div>

    <!-- Command palette -->
    <div class="overflow-hidden {commandPaletteActive ? 'h-full' : 'h-0'}">
        <OptionList
            options={commandPaletteOptions}
            focus={commandPaletteActive}
        ></OptionList>
    </div>
    <StatusBar></StatusBar>
</main>

<style>
    .main {
        height: 423px;
    }
    :global(.transition-height) {
        transition-property: height;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }
    :global(.will-change-height) {
        will-change: height;
    }
</style>