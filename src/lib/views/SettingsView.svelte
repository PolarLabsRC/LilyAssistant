<script>
    import OptionList from "../components/OptionList.svelte";
    import { settingsOptions } from "../functions/settings";
    export let active = false;
</script>

<div
    class="will-change-auto transition-height overflow-hidden {active
        ? 'h-full'
        : 'h-0'}"
>
    <OptionList options={settingsOptions} focus={active}></OptionList>
</div>
