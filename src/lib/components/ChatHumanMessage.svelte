<script>
    export let text;
    let markup = text.replace(/\n/g, "<br>");
</script>
<div class="flex w-full items-end justify-end p-3">
    <div class="max-w-md rounded-l-2xl rounded-t-2xl bg-teal-800 p-3">{@html markup}</div>
</div>