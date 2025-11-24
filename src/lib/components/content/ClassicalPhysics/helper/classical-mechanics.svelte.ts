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