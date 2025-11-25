<script lang="ts">
    import type { MouseEventType } from "$lib/helper/types";
    import ClassicalMechanicsForm1 from "./components/ClassicalMechanicsForm1.svelte";
    import { formulaForce, formulaKineticEnergy, formulaPotentialEnergy, formulaSpeed } from "./helper/classical-mechanics-formulas.svelte";
    import classical_mechanics_data from "./config/classical-mechanics.json"
    import transparent_image from "$lib/assets/transparent.png"

    const classicalMechanicsData = classical_mechanics_data.list

    let currentSubject = $state<string>(null)
    function currentSubjectHandler(ev: MouseEventType) {
        currentSubject = ev.currentTarget.id
    }

    $effect(() => {
        formulaForce()
        formulaSpeed()
        formulaKineticEnergy()
        formulaPotentialEnergy()
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
    <ul class="py-1 px-8 list-decimal w-fit border [&>li]:underline [&>li]:mt-1">
        <span id="subject_list"> daftar materi </span>
        {#each classicalMechanicsData as cm}
            <li><a href={`#${cm.id}`} id={cm.id} onclick={currentSubjectHandler}> {cm.subject} </a></li>
        {/each}
    </ul>
    <!-- content list -->
    <div class="flex flex-col gap-4">
        <!-- content item -->
        {#each classicalMechanicsData as cm}
            <div id={cm.id}>
                <!-- title -->
                <p class={currentSubject == cm.id ? 'bg-darkgreen-4/50' : ''}> 
                    <span class="font-semibold"> # {cm.subject} </span> 
                    <span> {cm.symbol} </span>
                </p>
                <div class="grid grid-cols-12">
                    <!-- description -->
                    <p class="col-span-8 whitespace-pre-line"> {cm.description} </p>
                    <!-- formula image -->
                    <img src={transparent_image} alt={`${cm.id}-formula`} class={`${cm.formulaImage} col-span-4 w-52 h-32`} draggable="false">
                </div>
                <!-- formula form -->
                <ClassicalMechanicsForm1 
                    subjectId={cm.id} 
                    params={cm.formInputs} 
                    placeholders={cm.formPlaceholders} 
                    operator={cm.operator} />
                <!-- return to top button -->
                <p class="text-right underline mt-5"><a href="#subject_list"> kembali ke daftar materi </a></p>
            </div>
        {/each}
    </div>
</div>