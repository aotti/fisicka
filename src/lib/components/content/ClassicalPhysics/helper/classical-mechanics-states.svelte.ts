import type { IClassicalMechanics } from "$lib/helper/types";

export const cm = $state<IClassicalMechanics['state']>({
    force: {
        element_m: null, element_a: null, element_F: null,
        value_m: 0, value_a: 0, value_F: 0,
        status_m: false, status_a: false, status_F: false,
    },
    speed: {
        element_d: null, element_t: null, element_v: null,
        value_d: 0, value_t: 0, value_v: 0,
        status_d: false, status_t: false, status_v: false,
    },
    acceleration: {
        element_a: null, element_v1: null, element_v0: null, element_t: null,
        value_a: 0, value_v1: 0, value_v0: 0, value_t: 0,
        status_a: false, status_v1: false, status_v0: false, status_t: false,
    },
    kinetic_energy: {
        element_m: null, element_v: null, element_Ek: null,
        value_m: 0, value_v: 0, value_Ek: 0,
        status_m: false, status_v: false, status_Ek: false,
    },
    potential_energy: {
        element_m: null, element_h: null, element_Ep: null,
        value_m: 0, value_h: 0, value_Ep: 0,
        status_m: false, status_h: false, status_Ep: false,
    },
    momentum: {
        element_m: null, element_v: null, element_p: null,
        value_m: 0, value_v: 0, value_p: 0,
        status_m: false, status_v: false, status_p: false,
    },
    impulse: {
        element_p2: null, element_p1: null, element_J: null,
        value_p2: 0, value_p1: 0, value_J: 0,
        status_p2: false, status_p1: false, status_J: false,
    },
})