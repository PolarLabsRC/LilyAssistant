<script>
    import Option from "./Option.svelte";
    import OptionInput from "./OptionInput.svelte";
    import { activeOption } from "../stores/main";
    import { textInput } from "../stores/textInput";
    import { OPTION_TYPE } from "../functions/options";
    import { view } from "../stores/view";

    export let options = [];
    export let focus = false;

    const resetActiveOption = () => activeOption.set(0);
    textInput.subscribe(resetActiveOption);
    view.subscribe(resetActiveOption);

    const onKeyDown = (event) => {
        if (!focus || filterOptions().length === 0) return;

        const { key } = event;
        if (key === "ArrowDown" && $activeOption < options.length - 1) {
            activeOption.update((n) => n + 1);
        } else if (key === "ArrowUp" && $activeOption > 0) {
            activeOption.update((n) => n - 1);
        }
    };

    const filterOptions = (textInput) => {
        const search = textInput?.toLowerCase();

        let filtered = options.filter(({ name }) =>
            name.toLowerCase().includes(search),
        );
        return filtered.length > 0 ? filtered : [options[0]];
    }

    $: filteredOptions = filterOptions($textInput); // TODO: Reactivity problem, ugly but works
</script>

<svelte:window on:keydown={onKeyDown} />
<div class="flex flex-col">
    {#each filterOptions($textInput) as option, index (option.name)}
        {#if option.type === OPTION_TYPE.input}
            <OptionInput {...{ isActive: index === $activeOption && focus, ...option }} />
        {:else if option.type === OPTION_TYPE.button}
            <Option {...{ isActive: index === $activeOption && focus, ...option }} />
        {/if}
    {/each}
</div>
