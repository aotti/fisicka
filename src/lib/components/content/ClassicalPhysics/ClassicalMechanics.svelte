<script lang="ts">
    import type { MouseEventType } from "$lib/helper/types";
    import ClassicalMechanicsForm from "./components/ClassicalMechanicsForm.svelte";
    import { formulaForce, formulaSpeed } from "./helper/classical-mechanics.svelte";
    import classical_mechanics from "./config/classical-mechanics.json"

    const classicalMechanicsData = classical_mechanics.list

    let currentSubject = $state<string>(null)
    function currentSubjectHandler(ev: MouseEventType) {
        currentSubject = ev.currentTarget.id
    }

    $effect(() => {
        formulaForce()
        formulaSpeed()
    })
</script>

<div class="flex flex-col gap-2 p-1 col-span-12 md:col-span-9 lg:col-span-9">
    <!-- head -->
    <h1 id="home" class="text-lg font-semibold"> Mekanika Klasik </h1>
    <p class="text-balance"> 
        Mekanika klasik adalah cabang fisika yang mempelajari gerak benda-benda makroskopis berdasarkan hukum Newton dan konsep gaya, massa, percepatan, energi, dan momentum. Teori ini sangat deterministik, artinya posisi dan kecepatan masa depan suatu benda dapat diprediksi dengan pasti jika kondisi awalnya diketahui.
    </p>
    <!-- body -->
    <!-- list of subjects -->
    <ul class="py-1 px-8 list-decimal [&>li]:underline w-fit border">
        <span> daftar materi </span>
        {#each classicalMechanicsData as cm}
            <li><a href={`#${cm.id}`} id={cm.id} onclick={currentSubjectHandler}> {cm.subject} </a></li>
        {/each}
    </ul>
    <!-- content list -->
    <div class="flex flex-col gap-4">
        <!-- content item -->
        {#each classicalMechanicsData as cm}
            <div id={cm.id}>
                <!-- title & desc -->
                <span class={currentSubject == cm.id ? 'bg-darkgreen-4/50' : ''}> # {cm.subject} </span>
                <p> {cm.description} </p>
                <ClassicalMechanicsForm subjectId={cm.id} params={cm.formInputs} placeholders={cm.formPlaceholders} operator={'*'} />
            </div>
        {/each}
    </div>
</div>