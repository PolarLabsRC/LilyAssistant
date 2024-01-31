<script>
    import { AIMessage, HumanMessage } from "langchain/schema";
    import { chat, generatingFlag } from "../stores/chat";
    import ChatAIMessage from "./ChatAIMessage.svelte";
    import ChatHumanMessage from "./ChatHumanMessage.svelte";
    import { textInput } from "../stores/textInput";
    import { prepareAI, tellAI } from "../functions/chat.js";
    import { onMount } from "svelte";
    import { openAIAPIKey } from "../stores/settings";
    import ChatTypingMessage from "./ChatTypingMessage.svelte";
    // TODO "code" can be too long and exid ai msg
    // TODO: message cannot be formated openAIKey.loadKeyFromFile('path/to/your/config.json');
    // TODO: Use evealuators to fallback to gpt 4

    export let focus = false;
    export let chatWrapper;
    onMount(() => {
        prepareAI(chatWrapper);
    });
    const onKeyDown = (event) => {
        if (!focus) return;

        const { key } = event;

        if (key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            tellAI($textInput);
            textInput.reset();
        }
    };
</script>

<svelte:window on:keydown={onKeyDown} />

<div
    class="h-full w-full overflow-scroll scroll-smooth text-sm"
    bind:this={chatWrapper}
>
    {#each $chat as message}
        <!-- TODO: ugly but works -->

        {#if message instanceof AIMessage}
            <ChatAIMessage text={message.content} />
        {:else if message instanceof HumanMessage}
            <ChatHumanMessage text={message.content} />
        {/if}
    {/each}
    {#if $generatingFlag}
        <ChatTypingMessage />
    {/if}
</div>
