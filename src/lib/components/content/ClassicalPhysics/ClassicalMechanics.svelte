<script lang="ts">
    import type { MouseEventType } from "$lib/helper/types";
    import FormulaCalcInput3 from "../FormulaCalculators/FormulaCalcInput3.svelte";
    import classical_mechanics_data from "./config/classical-mechanics.json"
    import ClassicalMechanicsDesc from "./components/ClassicalMechanicsDesc.svelte";
    import FormulaCalcInput4 from "../FormulaCalculators/FormulaCalcInput4.svelte";

    const classicalMechanicsData = classical_mechanics_data.list
    
    let currentSubject = $state<string>(null)
    function currentSubjectHandler(ev: MouseEventType) {
        currentSubject = ev.currentTarget.title
    }
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
            <li><a href={`#${cm.id}`} title={cm.id} onclick={currentSubjectHandler}> {cm.subject} </a></li>
        {/each}
    </ul>
    <!-- content list -->
    <div class="flex flex-col gap-4">
        <!-- content item -->
        {#each classicalMechanicsData as cmd}
            <div id={cmd.id}>
                <!-- title -->
                <p class={currentSubject == cmd.id ? 'bg-darkgreen-4/50' : ''}> 
                    <span class="font-semibold"> # {cmd.subject} </span> 
                    <span> {cmd.symbol} </span>
                </p>
                <!-- description and formula -->
                <ClassicalMechanicsDesc cmd={cmd} />
                <!-- formula calculator -->
                {#if cmd.formInputs.length === 3}
                    <FormulaCalcInput3 
                        subjectId={cmd.id} 
                        params={cmd.formInputs} 
                        placeholders={cmd.formPlaceholders} 
                        operator={cmd.operator} />
                {:else if cmd.formInputs.length === 4}
                    <FormulaCalcInput4 
                        subjectId={cmd.id} 
                        params={cmd.formInputs} 
                        placeholders={cmd.formPlaceholders} 
                        operator={cmd.operator} />
                {/if}
                <!-- return to top button -->
                <p class="text-right underline mt-5"><a href="#subject_list"> kembali ke daftar materi </a></p>
            </div>
        {/each}
    </div>
</div>