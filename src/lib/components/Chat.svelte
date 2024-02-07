<script>
    import { AIMessage, HumanMessage } from "langchain/schema";
    import { chat, generatingFlag } from "../stores/chat";
    import ChatAIMessage from "./ChatAIMessage.svelte";
    import ChatHumanMessage from "./ChatHumanMessage.svelte";
    import { textInput } from "../stores/textInput";
    import { resetChat, setupChat, tellAI } from "../functions/chat.js";
    import { onMount } from "svelte";
    import { openAIAPIKey } from "../stores/settings";
    import ChatTypingMessage from "./ChatTypingMessage.svelte";
    import { get } from "svelte/store";
    // TODO "code" can be too long and exid ai msg
    // TODO: message cannot be formated openAIKey.loadKeyFromFile('path/to/your/config.json');
    // TODO: Use evealuators to fallback to gpt 4

    export let focus = false;
    export let chatWrapper;
    let enterTimeout;
    let cleaning;
    onMount(() => {
        setupChat(chatWrapper);
    });

    const onKeyDown = (event) => {
        if (!focus) return;

        const { key } = event;

        if (
            key === "Enter" &&
            !event.shiftKey &&
            get(textInput).trim() !== ""
        ) {
            event.preventDefault();
            tellAI($textInput);
            textInput.reset();
        }

        if (key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (!cleaning) {
                enterTimeout = setTimeout(() => {
                    resetChat();
                    console.log("executed");
                }, 2500);
                cleaning = true;
            }
        }
    };

    const onKeyUp = (event) => {
        const key = event.key;
        console.log("ku");
        if (key === "Enter") {
            clearTimeout(enterTimeout);
            cleaning = false;
        }
    };
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div
    class="flex h-full w-full flex-col overflow-scroll scroll-smooth text-sm"
    bind:this={chatWrapper}
>
    <div class="overlay {cleaning ? 'active' : ''}"></div>
    {#if $chat.length <= 1}
        <div
            class="m-auto flex flex-col justify-center leading-8 text-zinc-500"
        >
            <div class="text-xl">Nothing here yet, start conversation</div>
            <br />
            <div class="text-center">
                Press
                <kbd
                    class="rounded border border-zinc-500 bg-zinc-700 px-1.5 py-1 text-xs font-semibold text-zinc-300"
                >
                    Enter
                </kbd>
                to send message <br />
            </div>
            <div class="text-center">
                Hold
                <kbd
                    class="rounded border border-zinc-500 bg-zinc-700 px-1.5 py-1 text-xs font-semibold text-zinc-300"
                >
                    Enter
                </kbd> to reset conversation
            </div>
        </div>
    {/if}
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

<style>
    .overlay {
        @apply bg-teal-600;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        transform: scaleX(0) scaleY(0.01);
        transform-origin: top left;
    }
    .active {
        animation: expand 2.8s forwards;
    }
    @keyframes expand {
        0% {
            transform: scaleX(0) scaleY(0.01);
            opacity: 1;
        }
        85% {
            transform: scaleX(1) scaleY(0.01);
            opacity: 1;
        }
        88% {
            transform: scaleX(1) scaleY(1);
            opacity: 1;
        }
        100% {
            transform: scaleX(1) scaleY(1);
            opacity: 0;
        }
    }
</style>
