<script>
    import OptionList from "../components/OptionList.svelte";
    import { apiSettingsOptions } from "../functions/apiSettings";
    export let active = false;
// TODO: animate with grid template rows

</script>

<div
    class="will-change-auto transition-height overflow-hidden {active
        ? 'h-full'
        : 'h-0'}"
>
    <OptionList options={apiSettingsOptions} focus={active}></OptionList>
</div>
