<script lang="ts">
    import table_of_contents from "./config/table-of-contents.json"
    const tableOfContents = table_of_contents.list
</script>

<div class="hidden md:col-span-2 md:flex md:flex-col lg:col-span-2 lg:flex lg:flex-col bg-darkgreen-1 p-1">
    <!-- head -->
    <span> sidebar desktop </span>
    <!-- body -->
    {#each tableOfContents as content}
        <a href={`#${content.id}`} class="hover:bg-darkgreen-3"> {content.name} </a>
    {/each}
</div>