import { cp } from "./classical-mechanics-states.svelte"

export function formulaForce() {
    if(cp.force.status_m && cp.force.status_a) {
        cp.force.status_m = false
        cp.force.status_a = false
        cp.force.value_F = +(+cp.force.value_m * +cp.force.value_a).toFixed(3)
    }
    else if(cp.force.status_F && cp.force.status_m) {
        cp.force.status_F = false
        cp.force.status_m = false
        cp.force.value_a = +(+cp.force.value_F / +cp.force.value_m).toFixed(3)
    }
    else if(cp.force.status_F && cp.force.status_a) {
        cp.force.status_F = false
        cp.force.status_a = false
        cp.force.value_m = +(+cp.force.value_F / +cp.force.value_a).toFixed(3)
    }
}

export function formulaSpeed() {
    if(cp.speed.status_d && cp.speed.status_t) {
        cp.speed.status_d = false
        cp.speed.status_t = false
        cp.speed.value_v = +(+cp.speed.value_d / +cp.speed.value_t).toFixed(3)
    }
    else if(cp.speed.status_v && cp.speed.status_d) {
        cp.speed.status_v = false
        cp.speed.status_d = false
        cp.speed.value_t = +(+cp.speed.value_v * +cp.speed.value_d).toFixed(3)
    }
    else if(cp.speed.status_v && cp.speed.status_t) {
        cp.speed.status_v = false
        cp.speed.status_t = false
        cp.speed.value_d = +(+cp.speed.value_v * +cp.speed.value_t).toFixed(3)
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
    if(cp.kinetic_energy.status_m && cp.kinetic_energy.status_v) {
        cp.kinetic_energy.status_m = false
        cp.kinetic_energy.status_v = false
        // ex: Ek = 0.5 * 5 * 2^2
        const step1 = 0.5 * +cp.kinetic_energy.value_m
        const step2 = Math.pow(+cp.kinetic_energy.value_v, 2)
        const step3 = step1 * step2
        cp.kinetic_energy.value_Ek = +step3.toFixed(3)
    }
    // v is unknown
    else if(cp.kinetic_energy.status_Ek && cp.kinetic_energy.status_m) {
        cp.kinetic_energy.status_Ek = false
        cp.kinetic_energy.status_m = false
        // #ex: 10 = 0.5 * 5 * v^2
        // #1: 10 = 2.5 * v^2
        const step1 = 0.5 * +cp.kinetic_energy.value_m
        // #2: 10 / 2.5 = v^2
        const step2 = +cp.kinetic_energy.value_Ek / step1
        // #3: 4 = v^2 (square root)
        const step3 = Math.sqrt(step2)
        cp.kinetic_energy.value_v = +step3.toFixed(3)
        
    }
    // m is unknown
    else if(cp.kinetic_energy.status_Ek && cp.kinetic_energy.status_v) {
        cp.kinetic_energy.status_Ek = false
        cp.kinetic_energy.status_v = false
        // #ex: 10 = 0.5 * m * 2^2
        // #1: 10 = 0.5 * m * 4
        const step1 = Math.pow(+cp.kinetic_energy.value_v, 2)
        // #2: 10 = 2 * m
        const step2 = 0.5 * step1
        // #3: 10 / 2 = m
        const step3 = +cp.kinetic_energy.value_Ek / step2
        cp.kinetic_energy.value_m = +step3.toFixed(3)
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
    if(cp.potential_energy.status_m && cp.potential_energy.status_h) {
        cp.potential_energy.status_m = false
        cp.potential_energy.status_h = false
        // ex: Ek = 2 * 9.8 * 4
        const step1 = +cp.potential_energy.value_m * 9.8 * +cp.potential_energy.value_h
        cp.potential_energy.value_Ep = +step1.toFixed(3)
    }
    // h is unknown
    else if(cp.potential_energy.status_Ep && cp.potential_energy.status_m) {
        cp.potential_energy.status_Ep = false
        cp.potential_energy.status_m = false
        // ex: Ek = 2 * 9.8 * h
        // #1: 50 = 19.6 * h
        const step1 = +cp.potential_energy.value_m * 9.8
        // #2: 50 / 19.6 = h
        const step2 = +cp.potential_energy.value_Ep / step1
        cp.potential_energy.value_h = +step2.toFixed(3)
        
    }
    // m is unknown
    else if(cp.potential_energy.status_Ep && cp.potential_energy.status_h) {
        cp.potential_energy.status_Ep = false
        cp.potential_energy.status_h = false
        // ex: Ek = m * 9.8 * 4
        // #1: 50 = 39.2 * m
        const step1 = 9.8 * +cp.potential_energy.value_h
        // #2: 50 / 39.2 = m
        const step2 = +cp.potential_energy.value_Ep / step1
        cp.potential_energy.value_m = +step2.toFixed(3)
    }
}