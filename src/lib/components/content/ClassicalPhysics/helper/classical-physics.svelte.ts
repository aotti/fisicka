import type { FormEventType } from "$lib/helper/types";

export function FormulaForce(ev: FormEventType) {
    const forceData = {m: 0, a: 0, F: 0}
    
    const formInputs = ev.currentTarget.elements
    for(let i=0; i<formInputs.length; i++) {
        const input = formInputs[i] as HTMLInputElement
        if(input.nodeName == 'INPUT') {
            // only calculate numeric value
            const value = +input.value
            // value is numeric
            if(!isNaN(value)) {
                // set value
                switch(input.id) {
                    case 'force_m': forceData.m = value; break
                    case 'force_a': forceData.a = value; break
                    case 'force_F': forceData.F = value; break
                }
            }
        }
    }

    for(let j=0; j<formInputs.length; j++) {
        const input = formInputs[j] as HTMLInputElement
        if(input.nodeName == 'INPUT') {
            // calc if there are atleast 2 inputs with value > 0
            // mass > 0 AND accelerate > 0
            if(forceData.m > 0 && forceData.a > 0 && input.id == 'force_F') {
                input.value = (forceData.m * forceData.a).toFixed(3)
            }
            // force > 0 AND mass > 0 || force > 0 AND accelerate > 0
            else if(forceData.F > 0 && forceData.m > 0 && input.id == 'force_a') {
                input.value = (forceData.F / forceData.m).toFixed(3)
            }
            else if(forceData.F > 0 && forceData.m > 0 && input.id == 'force_m') {
                input.value = (forceData.F / forceData.a).toFixed(3)
            }
        }
    }
}