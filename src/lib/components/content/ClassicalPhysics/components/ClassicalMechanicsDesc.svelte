<script lang="ts">
    import { Math } from "svelte-math"
    import { formulaUnitConverter } from "../helper/classical-mechanics-formulas.svelte";

    const {cmd} = $props() 
</script>

<div>
    <!-- desktop version -->
    <div class="hidden md:grid md:grid-cols-12 md:gap-1 lg:grid lg:grid-cols-12 lg:gap-1">
        <!-- description -->
        <p class="col-span-7 whitespace-pre-line"> {cmd.description} </p>
        <!-- formula image -->
        <div class="col-span-5 flex flex-col gap-1 px-2 border">
            {#each cmd.formulaLatex as formula, i}
            {@const isConverterNeeded = formula.match(/\/converter__.*/i)}
            {@const setConverter = isConverterNeeded ? isConverterNeeded[0].split('__') : null}
                <p class={i == 0 ? 'text-center text-xl' : ''}>
                    {#if setConverter}
                    <!-- setConverter: [0] = command, [1] = convert target, [2] = unit list -->
                    {@const [converterCommand, converterTarget, converterUnitList] = setConverter}
                        <Math> {formula.replaceAll(' ', '~').split('/converter')[0]} </Math>
                        <select id={`${cmd.id}__converter__${converterTarget}`} onchange={formulaUnitConverter}
                        class="bg-darkgreen-4 text-darkgreen-1 p-1 rounded-md">
                            {#each converterUnitList.split(',') as converterUnit}
                                <option value={converterUnit}> {converterUnit} </option>
                            {/each}
                        </select>
                    {:else}
                        <Math> {formula.replaceAll(' ', '~')} </Math>
                    {/if}
                </p>
            {/each}
        </div>
    </div>
    <!-- mobile version -->
    <div class="flex flex-col gap-2 md:hidden lg:hidden">
        <!-- description -->
        <p class="whitespace-pre-line"> {cmd.description} </p>
        <!-- formula image -->
        <div class="flex flex-col px-2 py-1 border">
            {#each cmd.formulaLatex as formula, i}
            {@const isConverterNeeded = formula.match(/\/converter__.*/i)}
            {@const setConverter = isConverterNeeded ? isConverterNeeded[0].split('__') : null}
                <p class={i == 0 ? 'text-center text-xl' : ''}>
                    {#if setConverter}
                    <!-- setConverter: [0] = command, [1] = convert target, [2] = unit list -->
                    {@const [converterCommand, converterTarget, converterUnitList] = setConverter}
                        <Math> {formula.replaceAll(' ', '~').split('/converter')[0]} </Math>
                        <select id={`${cmd.id}__converter__${converterTarget}`} onchange={formulaUnitConverter}
                        class="bg-darkgreen-4 text-darkgreen-1 p-1 rounded-md">
                            {#each converterUnitList.split(',') as converterUnit}
                                <option value={converterUnit}> {converterUnit} </option>
                            {/each}
                        </select>
                    {:else}
                        <Math> {formula.replaceAll(' ', '~')} </Math>
                    {/if}
                </p>
            {/each}
        </div>
    </div>
</div>