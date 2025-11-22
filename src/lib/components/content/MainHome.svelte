<script>
    import HeaderContent from "../header/HeaderContent.svelte";
import SidebarDesktop from "../sidebar/SidebarDesktop.svelte";
    import SidebarMobile from "../sidebar/SidebarMobile.svelte";
    import MainContent from "./MainContent.svelte";

</script>

<div class="">
    <!-- header -->
    <HeaderContent />

    <!-- main -->
    <div class="grid grid-cols-12">
        <!-- sidebar -->
        <SidebarDesktop />
        <SidebarMobile />
        <!-- content -->
        <MainContent />
    </div>
</div>