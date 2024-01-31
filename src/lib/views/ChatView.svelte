<script>
    import Chat from "../components/Chat.svelte";
    export let active = false;
</script>

<div
    class="will-change-auto transition-height overflow-hidden {active
        ? 'h-full'
        : 'h-0'}"
>
    <Chat focus="{active}"></Chat>
</div>
