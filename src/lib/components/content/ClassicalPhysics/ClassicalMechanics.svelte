<script lang="ts">
    import type { IClassicalMechanics, MouseEventType } from "$lib/helper/types";

    let currentSubject = $state<string>(null)
    function currentSubjectHandler(ev: MouseEventType) {
        currentSubject = ev.currentTarget.id
    }
    
    const forceData = $state({
        value_m: 0,
        value_a: 0,
        value_F: 0,
        status_m: false,
        status_a: false,
        status_F: false,
    })
    const speedData = $state({
        value_d: 0,
        value_t: 0,
        value_v: 0,
        status_d: false,
        status_t: false,
        status_v: false,
    })

    $effect(() => {
        // force formula
        if(forceData.status_m && forceData.status_a) {
            forceData.status_m = false
            forceData.status_a = false
            forceData.value_F = +(+forceData.value_m * +forceData.value_a).toFixed(3)
        }
        else if(forceData.status_F && forceData.status_m) {
            forceData.status_F = false
            forceData.status_m = false
            forceData.value_a = +(+forceData.value_F / +forceData.value_m).toFixed(3)
        }
        else if(forceData.status_F && forceData.status_a) {
            forceData.status_F = false
            forceData.status_a = false
            forceData.value_m = +(+forceData.value_F / +forceData.value_a).toFixed(3)
        }

        // speed formula
        if(speedData.status_d && speedData.status_t) {
            speedData.status_d = false
            speedData.status_t = false
            speedData.value_v = +(+speedData.value_d / +speedData.value_t).toFixed(3)
        }
        else if(speedData.status_v && speedData.status_d) {
            speedData.status_v = false
            speedData.status_d = false
            speedData.value_t = +(+speedData.value_v * +speedData.value_d).toFixed(3)
        }
        else if(speedData.status_v && speedData.status_t) {
            speedData.status_v = false
            speedData.status_t = false
            speedData.value_d = +(+speedData.value_v * +speedData.value_t).toFixed(3)
        }
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
        <li><a href="#gaya" id="force" onclick={currentSubjectHandler}> gaya </a></li>
        <li><a href="#kecepatan" id="speed" onclick={currentSubjectHandler}> kecepatan </a></li>
    </ul>
    <!-- content -->
    <div class="flex flex-col gap-4">
        <!-- force -->
        <div id="force">
            <!-- title & desc -->
            <span class={currentSubject == 'force' ? 'bg-darkgreen-4/50' : ''}> # gaya </span>
            <p> 
                Cabang fisika yang mempelajari gerak benda-benda makroskopis di bawah pengaruh gaya, berdasarkan hukum gerak Newton. Konsep utamanya adalah gaya, yang merupakan interaksi (tarikan atau dorongan) yang menyebabkan perubahan kecepatan suatu benda. 
            </p>
            <!-- formula form -->
            <form class="flex gap-2" onsubmit={ev => ev.preventDefault()}>
                <!-- input 1 -->
                <div class="flex flex-col items-center">
                    <label for="force_m"> m (kg) </label>
                    <input bind:value={forceData.value_m} type="text" id="force_m" class="border border-green-400 px-1 w-24" placeholder="massa" onblur={()=>forceData.status_m = true}>
                </div>
                <!-- operator -->
                <span> * </span>
                <!-- input 2 -->
                <div class="flex flex-col items-center">
                    <label for="force_a"> a (m/s^2) </label>
                    <input bind:value={forceData.value_a} type="text" id="force_a" class="border border-green-400 px-1 w-24" placeholder="percepatan" onblur={()=>forceData.status_a = true}>
                </div>
                <!-- operator -->
                <span class="border-t border-b my-auto w-4 h-2"></span>
                <!-- input 3 -->
                <div class="flex flex-col items-center">
                    <label for="force_F"> F </label>
                    <input bind:value={forceData.value_F} type="text" id="force_F" class="border border-green-400 px-1 w-24" placeholder="gaya" onblur={()=>forceData.status_F = true}>
                </div>
            </form>
        </div>
        <!-- speed -->
        <div id="speed">
            <!-- title & desc -->
            <span class={currentSubject == 'speed' ? 'bg-darkgreen-4/50' : ''}> # kecepatan </span>
            <p>
                Cabang fisika yang mempelajari gerak benda sehari-hari, di mana kecepatan adalah besaran yang menjelaskan laju perubahan jarak benda terhadap waktu. (m/s = meter per second)
            </p>
            <!-- formula form -->
            <form class="flex gap-2" onsubmit={ev => ev.preventDefault()}>
                <!-- input 1 -->
                <div class="flex flex-col items-center">
                    <label for="speed_d"> d (m) </label>
                    <input bind:value={speedData.value_d} type="text" id="speed_d" class="border border-green-400 px-1 w-24" placeholder="jarak" onblur={()=>speedData.status_d = true}>
                </div>
                <!-- operator -->
                <span> / </span>
                <!-- input 2 -->
                <div class="flex flex-col items-center">
                    <label for="speed_t"> t (s) </label>
                    <input bind:value={speedData.value_t} type="text" id="speed_t" class="border border-green-400 px-1 w-24" placeholder="waktu" onblur={()=>speedData.status_t = true}>
                </div>
                <!-- operator -->
                <span class="border-t border-b my-auto w-4 h-2"></span>
                <!-- input 3 -->
                <div class="flex flex-col items-center">
                    <label for="speed_v"> V (m/s) </label>
                    <input bind:value={speedData.value_v} type="text" id="speed_v" class="border border-green-400 px-1 w-24" placeholder="kecepatan" onblur={()=>speedData.status_v = true}>
                </div>
            </form>
        </div>
    </div>
</div>