<script lang="ts">
    import { page } from "$app/stores";
    import { sharedStates } from "$lib/helper/shared-states.svelte";
    import HeaderContent from "../header/HeaderContent.svelte";
    import SidebarDesktop from "../sidebar/SidebarDesktop.svelte";
    import SidebarMobile from "../sidebar/SidebarMobile.svelte";
    import ClassicalMechanics from "./ClassicalPhysics/ClassicalMechanics.svelte";
    import MainHome from "./MainHome.svelte";

    // get page section from search param
    const getSection = $page.url.searchParams.get('section')
    if(getSection) {
        sharedStates.currentPage = getSection
    }
</script>

<div class="bg-darkgreen-2 text-white h-screen">
    <!-- header -->
    <HeaderContent />

    <!-- main -->
    <div class="grid grid-cols-12">
        <!-- sidebar -->
        <SidebarDesktop />
        <SidebarMobile />
        <!-- content -->
        {#if sharedStates.currentPage == 'home'}
            <MainHome />
        {:else if sharedStates.currentPage == 'mekanika_klasik'}
            <ClassicalMechanics />
        {:else}
            <MainHome />
        {/if}
    </div>
</div>