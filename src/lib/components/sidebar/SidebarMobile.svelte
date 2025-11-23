<script lang="ts">
    import { clickOutside } from "$lib/helper/misc-helper.svelte";
    import { sharedStates } from "$lib/helper/shared-states.svelte";
    import table_of_contents from "./config/table-of-contents.json"
    const tableOfContents = table_of_contents.list

    let extendSidebar = $state(false)
    function categoryHandler(id: string) {
        sharedStates.currentPage = id
    }
</script>

<div class={`fixed top-0 overflow-clip ${extendSidebar ? 'w-max' : 'w-12 h-10'}
md:hidden lg:hidden bg-darkgreen-1`}>
    <div class="flex flex-col w-max border-r border-b" use:clickOutside={() => extendSidebar = false}>
        <!-- category button -->
        <button type="button" class="px-1 w-fit bg-darkgreen-4/50 hover:bg-darkgreen-1" onclick={() => extendSidebar = !extendSidebar}>
            <img src="https://img.icons8.com/?id=95245&format=png&color=FFFFFF&size=40" alt="sidebar-mobile" class="inline">
            <span> daftar kategori </span>
        </button>
        <!-- category list -->
        {#each tableOfContents as content}
            <a href={`?section=${content.id}`} class="p-1 hover:bg-darkgreen-3" onclick={() => categoryHandler(content.id)}> 
                {`- ${content.name}`} 
            </a>
        {/each}
    </div>
</div>