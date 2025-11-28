<script lang="ts">
    import type { IClassicalMechanics } from "$lib/helper/types";
    import { cm } from "../ClassicalPhysics/helper/classical-mechanics-states.svelte";
    
    // use this code to get multiple props without error 
    const getProps = $props() 
    const {subjectId, params, placeholders, operator} = getProps as IClassicalMechanics['props']

    $effect(() => {
        // 
    })
</script>

<!-- formula form -->
<form class="flex gap-2 mt-2" onsubmit={ev => ev.preventDefault()}>
    <!-- input 1 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[0]}`}> {params[0]} </label>
        <input type="text" 
            class="border px-1 w-24 md:w-32 lg:w-32" 
            id={`${subjectId}_${params[0]}`} 
            bind:value={cm[subjectId][`value_${params[0]}`]} 
            placeholder={placeholders[0]} 
            onblur={() => cm[subjectId][`status_${params[0]}`] = true}>
    </div>
    <!-- equal -->
    <span class="border-t border-b my-auto w-4 h-2"></span>
    
    <!-- input 2 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[1]}`}> {params[1]} </label>
        <input type="text" 
            class="border px-1 w-24 md:w-32 lg:w-32" 
            id={`${subjectId}_${params[1]}`} 
            bind:value={cm[subjectId][`value_${params[1]}`]} 
            placeholder={placeholders[1]} 
            onblur={() => cm[subjectId][`status_${params[1]}`] = true}>
    </div>
    <!-- operator -->
    <span> {operator[0]} </span>
    
    <!-- input 3 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[2]}`}> {params[2]} </label>
        <input type="text" 
            class="border px-1 w-24 md:w-32 lg:w-32" 
            id={`${subjectId}_${params[2]}`} 
            bind:value={cm[subjectId][`value_${params[2]}`]} 
            placeholder={placeholders[2]} 
            onblur={() => cm[subjectId][`status_${params[2]}`] = true}>
    </div>
    <!-- operator -->
    <span> {operator[1]} </span>
    
    <!-- input 4 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[3]}`}> {params[3]} </label>
        <input type="text" 
            class="border px-1 w-24 md:w-32 lg:w-32" 
            id={`${subjectId}_${params[3]}`} 
            bind:value={cm[subjectId][`value_${params[3]}`]} 
            placeholder={placeholders[3]} 
            onblur={() => cm[subjectId][`status_${params[3]}`] = true}>
    </div>
</form>