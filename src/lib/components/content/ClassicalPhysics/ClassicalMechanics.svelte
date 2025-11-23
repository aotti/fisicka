<script lang="ts">
    import type { MouseEventType } from "$lib/helper/types";
    import { FormulaForce } from "./helper/classical-physics.svelte";

    let currentSubject = $state<string>(null)
    function currentSubjectHandler(ev: MouseEventType) {
        currentSubject = ev.currentTarget.id
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
    <ul class="ml-8 list-decimal [&>li]:underline">
        <li><a href="#gaya" id="gaya" onclick={currentSubjectHandler}> gaya </a></li>
        <li><a href="#kecepatan" id="kecepatan" onclick={currentSubjectHandler}> kecepatan </a></li>
    </ul>
    <!-- content -->
    <div class="flex flex-col gap-4">
        <!-- force -->
        <div id="force">
            <span class={currentSubject == 'force' ? 'bg-darkgreen-4/50' : ''}> gaya lelemao </span>
            <p> gaya adalah lorem ipsum dolor sit amet awiwi baka </p>
            <!-- formula form -->
            <form class="flex gap-2" onsubmit={ev => ev.preventDefault()} oninput={FormulaForce}>
                <!-- input 1 -->
                <div class="flex flex-col items-center">
                    <label for="force_m"> m (kg) </label>
                    <input type="text" id="force_m" class="border px-1 w-24" placeholder="massa">
                </div>
                <!-- operator -->
                <span> * </span>
                <!-- input 2 -->
                <div class="flex flex-col items-center">
                    <label for="force_a"> a (m/s^2) </label>
                    <input type="text" id="force_a" class="border px-1 w-24" placeholder="percepatan">
                </div>
                <!-- operator -->
                <span class="border-t border-b my-auto w-4 h-2"></span>
                <!-- input 3 -->
                <div class="flex flex-col items-center">
                    <label for="force_F"> F </label>
                    <input type="text" id="force_F" class="border px-1 w-24" placeholder="gaya">
                </div>
            </form>
        </div>
        <!-- speed -->
        <div id="speed">
            <span class={currentSubject == 'speed' ? 'bg-darkgreen-4/50' : ''}> kecepatan lelemao </span>
            <p> kecepatan adalah lorem ipsum dolor sit amet awiwi baka </p>
        </div>
    </div>
</div>