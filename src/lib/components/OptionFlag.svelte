<script>
    import { textInput } from "../stores/textInput";

    export let callback;
    export let isActive;
    export let name;
    export let description;
    export let icon;
    export let showIcon;
    export let status;


    $: activeGlobalClass = isActive ? "bg-zinc-800" : "";
    $: activeIndicatorClass = isActive ? "" : "hidden";
    $: activeTextClass = isActive ? "translate-x-1" : "";
    const onKeyDown = (event) => {
        if (isActive && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            setTimeout(callback, 0);
        }
    };
</script>
<svelte:window on:keydown={onKeyDown} />

<div class="flex items-center {activeGlobalClass} pr-8">
    <div class="w-1 h-5 bg-teal-500 rounded-lg {activeIndicatorClass}"></div>
    <div class="flex p-3.5 {activeTextClass} transition-transform">
        <div
            class="flex w-12 items-center justify-center {showIcon
                ? ''
                : 'hidden'}"
        >
            <img src={icon} alt="" />
        </div>
        <div class="mr-auto">
            <h1 class="text-sm">{name}</h1>
            <h2 class="text-xs text-zinc-500">{description}</h2>
        </div>
    </div>
    <label class="relative ml-auto flex cursor-pointer items-center">
        <input type="checkbox" bind:checked={$status} value="" class="peer sr-only">
        <div class="peer h-7 w-12 rounded bg-zinc-600 after:absolute after:start-[4px] after:top-1 after:h-5 after:w-5 after:rounded after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
    </label>
</div>
