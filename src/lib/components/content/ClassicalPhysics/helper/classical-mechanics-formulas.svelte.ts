import type { IClassicalMechanics, OnChangeEventType } from "$lib/helper/types"
import { cm } from "./classical-mechanics-states.svelte"

export function formulaUnitConverter(ev: OnChangeEventType) {
    type FormulaUnitConverterType = [keyof IClassicalMechanics['state'], string, string]
    const [formulaTarget, _, formulaUnits] = ev.currentTarget.id.split('_') as FormulaUnitConverterType
    const currentUnitList = ev.currentTarget.value

    for(let unit of formulaUnits) {
        if(formulaTarget == 'speed') {
            // only velocity AND distance get converts
            switch(unit) {
                case 'v': case 'd':
                    currentUnitList == 'km/h'
                        // convert to km/h
                        ? cm[formulaTarget][`value_${unit}`] = +cm[formulaTarget][`value_${unit}`] * 3.6
                        // convert to m/s
                        : cm[formulaTarget][`value_${unit}`] = +cm[formulaTarget][`value_${unit}`] / 3.6
                    break
            }
        }
    }
}

export function formulaForce() {
    if(cm.force.status_m && cm.force.status_a) {
        cm.force.status_m = false
        cm.force.status_a = false
        cm.force.value_F = +(+cm.force.value_m * +cm.force.value_a).toFixed(3)
    }
    else if(cm.force.status_F && cm.force.status_m) {
        cm.force.status_F = false
        cm.force.status_m = false
        cm.force.value_a = +(+cm.force.value_F / +cm.force.value_m).toFixed(3)
    }
    else if(cm.force.status_F && cm.force.status_a) {
        cm.force.status_F = false
        cm.force.status_a = false
        cm.force.value_m = +(+cm.force.value_F / +cm.force.value_a).toFixed(3)
    }
}

export function formulaSpeed() {
    if(cm.speed.status_d && cm.speed.status_t) {
        cm.speed.status_d = false
        cm.speed.status_t = false
        cm.speed.value_v = +(+cm.speed.value_d / +cm.speed.value_t).toFixed(3)
    }
    else if(cm.speed.status_v && cm.speed.status_d) {
        cm.speed.status_v = false
        cm.speed.status_d = false
        cm.speed.value_t = +(+cm.speed.value_v * +cm.speed.value_d).toFixed(3)
    }
    else if(cm.speed.status_v && cm.speed.status_t) {
        cm.speed.status_v = false
        cm.speed.status_t = false
        cm.speed.value_d = +(+cm.speed.value_v * +cm.speed.value_t).toFixed(3)
    }
}

/**
 * @description formula Ek = 0.5 * m * v^2
 * kinetic energy properties
 * - value_m
 * - value_v
 * - value_Ek
 * - status_m
 * - status_v
 * - status_Ek
 */
export function formulaKineticEnergy() {
    // Ek is unknown
    if(cm.kinetic_energy.status_m && cm.kinetic_energy.status_v) {
        cm.kinetic_energy.status_m = false
        cm.kinetic_energy.status_v = false
        // ex: Ek = 0.5 * 5 * 2^2
        const step1 = 0.5 * +cm.kinetic_energy.value_m
        const step2 = Math.pow(+cm.kinetic_energy.value_v, 2)
        const step3 = step1 * step2
        cm.kinetic_energy.value_Ek = +step3.toFixed(3)
    }
    // v is unknown
    else if(cm.kinetic_energy.status_Ek && cm.kinetic_energy.status_m) {
        cm.kinetic_energy.status_Ek = false
        cm.kinetic_energy.status_m = false
        // #ex: 10 = 0.5 * 5 * v^2
        // #1: 10 = 2.5 * v^2
        const step1 = 0.5 * +cm.kinetic_energy.value_m
        // #2: 10 / 2.5 = v^2
        const step2 = +cm.kinetic_energy.value_Ek / step1
        // #3: 4 = v^2 (square root)
        const step3 = Math.sqrt(step2)
        cm.kinetic_energy.value_v = +step3.toFixed(3)
        
    }
    // m is unknown
    else if(cm.kinetic_energy.status_Ek && cm.kinetic_energy.status_v) {
        cm.kinetic_energy.status_Ek = false
        cm.kinetic_energy.status_v = false
        // #ex: 10 = 0.5 * m * 2^2
        // #1: 10 = 0.5 * m * 4
        const step1 = Math.pow(+cm.kinetic_energy.value_v, 2)
        // #2: 10 = 2 * m
        const step2 = 0.5 * step1
        // #3: 10 / 2 = m
        const step3 = +cm.kinetic_energy.value_Ek / step2
        cm.kinetic_energy.value_m = +step3.toFixed(3)
    }
}

/**
 * @description formula Ep = m * g (9.8) * h
 * kinetic energy properties
 * - value_m
 * - value_h
 * - value_Ep
 * - status_m
 * - status_h
 * - status_Ep
 */
export function formulaPotentialEnergy() {
    // Ek is unknown
    if(cm.potential_energy.status_m && cm.potential_energy.status_h) {
        cm.potential_energy.status_m = false
        cm.potential_energy.status_h = false
        // ex: Ek = 2 * 9.8 * 4
        const step1 = +cm.potential_energy.value_m * 9.8 * +cm.potential_energy.value_h
        cm.potential_energy.value_Ep = +step1.toFixed(3)
    }
    // h is unknown
    else if(cm.potential_energy.status_Ep && cm.potential_energy.status_m) {
        cm.potential_energy.status_Ep = false
        cm.potential_energy.status_m = false
        // ex: Ek = 2 * 9.8 * h
        // #1: 50 = 19.6 * h
        const step1 = +cm.potential_energy.value_m * 9.8
        // #2: 50 / 19.6 = h
        const step2 = +cm.potential_energy.value_Ep / step1
        cm.potential_energy.value_h = +step2.toFixed(3)
        
    }
    // m is unknown
    else if(cm.potential_energy.status_Ep && cm.potential_energy.status_h) {
        cm.potential_energy.status_Ep = false
        cm.potential_energy.status_h = false
        // ex: Ek = m * 9.8 * 4
        // #1: 50 = 39.2 * m
        const step1 = 9.8 * +cm.potential_energy.value_h
        // #2: 50 / 39.2 = m
        const step2 = +cm.potential_energy.value_Ep / step1
        cm.potential_energy.value_m = +step2.toFixed(3)
    }
}