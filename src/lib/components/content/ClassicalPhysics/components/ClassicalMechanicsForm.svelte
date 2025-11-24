<script lang="ts">
    import type { IClassicalMechanics } from "$lib/helper/types";
    import { cp } from "../helper/classical-mechanics-states.svelte";
    const getProps = $props() 
    const {subjectId, params, placeholders, operator} = getProps as IClassicalMechanics['props']
</script>

<!-- formula form -->
<form class="flex gap-2" onsubmit={ev => ev.preventDefault()}>
    <!-- input 1 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[0]}`}> {params[0]} </label>
        <input type="text" 
            class="border border-green-400 px-1 w-24" 
            id={`${subjectId}_${params[0]}`} 
            bind:value={cp[subjectId][`value_${params[0]}`]} 
            placeholder={placeholders[0]} 
            onblur={() => cp[subjectId][`status_${params[0]}`] = true}>
    </div>
    <!-- operator -->
    <span> {operator} </span>
    
    <!-- input 2 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[1]}`}> {params[1]} </label>
        <input type="text" 
            class="border border-green-400 px-1 w-24" 
            id={`${subjectId}_${params[1]}`} 
            bind:value={cp[subjectId][`value_${params[1]}`]} 
            placeholder={placeholders[1]} 
            onblur={() => cp[subjectId][`status_${params[1]}`] = true}>
    </div>
    <!-- equal -->
    <span class="border-t border-b my-auto w-4 h-2"></span>

    <!-- input 3 -->
    <div class="flex flex-col items-center">
        <label for={`${subjectId}_${params[2]}`}> {params[2]} </label>
        <input type="text" 
            class="border border-green-400 px-1 w-24" 
            id={`${subjectId}_${params[2]}`} 
            bind:value={cp[subjectId][`value_${params[2]}`]} 
            placeholder={placeholders[2]} 
            onblur={() => cp[subjectId][`status_${params[2]}`] = true}>
    </div>
</form>