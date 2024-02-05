<script>
    import { textInput } from "../stores/textInput";

    export let callback;
    export let isActive;
    export let name;
    export let description;
    export let icon;
    export let showIcon;

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

<div class="flex items-center {activeGlobalClass}">
    <div class="w-1 h-5 bg-teal-500 rounded-lg {activeIndicatorClass}"></div>
    <div class="flex p-3.5 {activeTextClass} transition-transform">
        <div
            class="flex w-12 items-center justify-center {showIcon
                ? ''
                : 'hidden'}"
        >
            <img src={icon} alt="" />
        </div>
        <div>
            <h1 class="text-sm">{name}</h1>
            <h2 class="text-xs text-zinc-500">{description}</h2>
        </div>
    </div>
</div>
