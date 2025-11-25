import type { IClassicalMechanics } from "$lib/helper/types";

export const cp = $state<IClassicalMechanics['state']>({
    force: {
        value_m: 0,
        value_a: 0,
        value_F: 0,
        status_m: false,
        status_a: false,
        status_F: false,
    },
    speed: {
        value_d: 0,
        value_t: 0,
        value_v: 0,
        status_d: false,
        status_t: false,
        status_v: false,
    },
    kinetic_energy: {
        value_m: 0,
        value_v: 0,
        value_Ek: 0,
        status_m: false,
        status_v: false,
        status_Ek: false,
    },
    potential_energy: {
        value_m: 0,
        value_h: 0,
        value_Ep: 0,
        status_m: false,
        status_h: false,
        status_Ep: false,
    }
})