<script lang="ts">
    import table_of_contents from "./config/table-of-contents.json"
    const tableOfContents = table_of_contents.list

    let extendSidebar = $state(false)
</script>

<div class={` absolute top-0 overflow-clip ${extendSidebar ? 'w-max' : 'w-15'}
md:hidden lg:hidden bg-darkgreen-1 p-1`}>
    <div class="flex flex-col w-max">
        <!-- head -->
        <button type="button" onclick={() => extendSidebar = !extendSidebar}> sidebar mobile </button>
        <!-- body -->
        {#each tableOfContents as content}
            <a href={`#${content.id}`} class="hover:bg-darkgreen-3"> {content.name} </a>
        {/each}
    </div>
</div>