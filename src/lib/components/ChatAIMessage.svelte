<script>
    import { marked } from "marked";
    import FoxImage from "../images/fox.png";
    export let text;
    let markup = marked(text);

    //TODO: checkout allowlist and remove "all"
</script>

<div class="flex w-full items-end justify-start p-3">
    <div class="mr-3 grid h-14 w-14 place-items-center rounded bg-zinc-800 p-1">
        <img src={FoxImage} alt="" srcset="" class="rounded" />
    </div>
    <div class="max-w-md rounded-r-2xl rounded-t-2xl bg-zinc-800 p-3 leading-6">
        {@html markup}
    </div>
</div>

<style>
    :global(code) {
        @apply bg-zinc-900 px-1 inline-block;
    }
    :global(pre) {
        @apply bg-zinc-900 p-3.5 rounded w-full overflow-auto my-1;
    }
</style>
