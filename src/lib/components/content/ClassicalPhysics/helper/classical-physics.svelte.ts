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
                // calc if there are atleast 2 inputs with value > 0
                switch(input.id) {
                    case 'force_m': forceData.m = value; break
                    case 'force_a': forceData.a = value; break
                    case 'force_F': forceData.F = value; break
                }
            }
        }
    }
}