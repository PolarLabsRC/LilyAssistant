<script>
    import { textInput } from "../stores/textInput";

    let input;
    let inputText;
    export let isActive;
    export let name;
    export let description;
    export let icon;
    export let callback;

    $: activeGlobalClass = isActive ? "bg-zinc-800" : "";
    $: activeIndicatorClass = isActive ? "" : "hidden";
    $: activeTextClass = isActive ? "translate-x-1" : "";
    $: {
        if (input && isActive) {
            input.focus();
        } else if (input) {
            input.blur();
            input.value = ""
        }
    }
    const onKeyDown = (event) => {
        if (isActive && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            setTimeout(() => callback(input), 0);
            textInput.reset();
        }
    };
</script>

<svelte:window on:keydown={onKeyDown} />
<div class="flex items-center {activeGlobalClass}">
    <div class="w-1 h-5 bg-teal-500 rounded-lg {activeIndicatorClass}"></div>
    <div class="flex p-3.5 w-full transition-transform {activeTextClass}">
        <div class="w-full">
            <h1 class="text-sm">{name}</h1>
            <h2 class="text-xs text-zinc-500">
                {description}
            </h2>
            <input
                bind:value={inputText}
                bind:this={input}
                placeholder="sk-****************"
                class="mt-3.5 w-full border border-zinc-600 bg-zinc-900 p-3.5 text-sm focus:outline focus:outline-1 focus:outline-zinc-300"
                autofocus
                type="text"
            />
        </div>
    </div>
</div>
