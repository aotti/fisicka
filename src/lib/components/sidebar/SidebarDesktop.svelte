<script lang="ts">
    import { sharedStates } from "$lib/helper/shared-states.svelte";
    import table_of_contents from "./config/table-of-contents.json"
    const tableOfContents = table_of_contents.list
    
    function categoryHandler(id: string) {
        sharedStates.currentPage = id
    }
</script>

<div class="hidden md:col-span-2 md:flex md:flex-col lg:col-span-2 lg:flex lg:flex-col bg-darkgreen-1 p-1">
    <!-- category title -->
    <span> daftar kategori </span>
    <!-- category list -->
    {#each tableOfContents as content}
        <a href={`?section=${content.id}`} class="hover:bg-darkgreen-3" onclick={() => categoryHandler(content.id)}> 
            {`- ${content.name}`} 
        </a>
    {/each}
</div>