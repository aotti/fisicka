import type { IClassicalMechanics, IMathOperation, OnChangeEventType } from "$lib/helper/types"
import { cm } from "./classical-mechanics-states.svelte"

export function formulaUnitConverter(ev: OnChangeEventType) {
    type FormulaUnitConverterType = [keyof IClassicalMechanics['state'], string, string]
    const [formulaSubject, _, formulaUnits] = ev.currentTarget.id.split('__') as FormulaUnitConverterType
    const currentUnitList = ev.currentTarget.value
            

    for(let unit of formulaUnits.split(',')) {
        if(formulaSubject == 'speed') {
            // only velocity AND distance get converts
            switch(unit) {
                case 'v': case 'd':
                    currentUnitList == 'km/h'
                        // convert to km/h
                        ? cm[formulaSubject][`value_${unit}`] = +cm[formulaSubject][`value_${unit}`] * 3.6
                        // convert to m/s
                        : cm[formulaSubject][`value_${unit}`] = +cm[formulaSubject][`value_${unit}`] / 3.6
                    break
            }
        }
        else if(formulaSubject == 'kinetic_energy' || formulaSubject == 'potential_energy') {
            // only energy get convert
            switch(unit) {
                case 'Ek': case 'Ep':
                    currentUnitList == 'KJ'
                        // convert to kilo joule
                        ? cm[formulaSubject][`value_${unit}`] = +cm[formulaSubject][`value_${unit}`] / 1000
                        // convert to joule
                        : cm[formulaSubject][`value_${unit}`] = +cm[formulaSubject][`value_${unit}`] * 1000
                    break
            }
        }
    }
}

function formulaBorderHighlight(subject: keyof IClassicalMechanics['state'], units: string[]) {
    for(let i in units) {
        if(i === '0') {
            // add border highlight answer element
            (cm[subject][`element_${units[i]}`] as HTMLElement).classList.add('border-green-400');
        } else {
            // remove border highlight from others
            (cm[subject][`element_${units[i]}`] as HTMLElement).classList.remove('border-green-400');
        }
    }
}

/**
 * @description do math operation
 * @param subject formula subject
 * @param unitList list of unit that will do operation, ex: a + b => ['a', 'b']
 * @param operator math operator + - * / ..etc
 * @returns 
 */
function MathOperation(subject: IMathOperation['subject'], unitList: string[], operator: IMathOperation['operator']) {
    const checkOperator = operator.match(/\+$|\-$|\*$|\/$|pow-\d+$|sqrt$/)
    // only do math operation if it exist in the regex
    if(checkOperator) {
        const [tempOperator, tempParam] = checkOperator[0].split('-')
        // do math then return
        switch (tempOperator) {
            case '+':
                return +cm[subject][`value_${unitList[0]}`] + +cm[subject][`value_${unitList[1]}`]
            case '-':
                return +cm[subject][`value_${unitList[0]}`] - +cm[subject][`value_${unitList[1]}`]
            case '*':
                return +cm[subject][`value_${unitList[0]}`] * +cm[subject][`value_${unitList[1]}`]
            case '/':
                return +cm[subject][`value_${unitList[0]}`] / +cm[subject][`value_${unitList[1]}`]
            case 'pow':
                return Math.pow(+cm[subject][`value_${unitList[0]}`], +tempParam)
            case 'sqrt':
                return Math.sqrt(+cm[subject][`value_${unitList[0]}`])
        }
    }
}

/**
 * @description formula F = m * a
 * state props (F, m, a)
 * - element
 * - value
 * - status
 */
export function formulaForce() {
    // F is unknown
    if(cm.force.status_m && cm.force.status_a) {
        cm.force.status_m = false
        cm.force.status_a = false
        cm.force.value_F = +MathOperation('force', ['m', 'a'], '*').toFixed(3)
        formulaBorderHighlight('force', ['F','m','a'])
    }
    // a is unknown
    else if(cm.force.status_F && cm.force.status_m) {
        cm.force.status_F = false
        cm.force.status_m = false
        cm.force.value_a = +MathOperation('force', ['F', 'm'], '/').toFixed(3)
        formulaBorderHighlight('force', ['a','F','m'])
    }
    // m is unknown
    else if(cm.force.status_F && cm.force.status_a) {
        cm.force.status_F = false
        cm.force.status_a = false
        cm.force.value_m = +MathOperation('force', ['F', 'a'], '/').toFixed(3)
        formulaBorderHighlight('force', ['m','F','a'])
    }
}

export function formulaSpeed() {
    if(cm.speed.status_d && cm.speed.status_t) {
        cm.speed.status_d = false
        cm.speed.status_t = false
        cm.speed.value_v = +(+cm.speed.value_d / +cm.speed.value_t).toFixed(3)
        formulaBorderHighlight('speed', ['v','d','t'])
    }
    else if(cm.speed.status_v && cm.speed.status_d) {
        cm.speed.status_v = false
        cm.speed.status_d = false
        cm.speed.value_t = +(+cm.speed.value_d / +cm.speed.value_v).toFixed(3)
        formulaBorderHighlight('speed', ['t','v','d'])
    }
    else if(cm.speed.status_v && cm.speed.status_t) {
        cm.speed.status_v = false
        cm.speed.status_t = false
        cm.speed.value_d = +(+cm.speed.value_v * +cm.speed.value_t).toFixed(3)
        formulaBorderHighlight('speed', ['d','v','t'])
    }
}

/**
 * @description formula a = (v1 - v0) / t
 * state props (a, v1, v0, t)
 * - element
 * - value
 * - status
 */
export function formulaAcceleration() {
    // v1, v0, t
    if(cm.acceleration.status_v1 && cm.acceleration.status_v0 && cm.acceleration.status_t) {
        cm.acceleration.status_v1 = false
        cm.acceleration.status_v0 = false
        cm.acceleration.status_t = false
        // ex: a = (20 - 0) / 5
        // #1: a = 20 / 5
        const step1 = +cm.acceleration.value_v1 - +cm.acceleration.value_v0
        // #2: a = 4
        const step2 = step1 / +cm.acceleration.value_t
        cm.acceleration.value_a = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['a','v1','v0', 't'])
    }
    // v0, t, a
    else if(cm.acceleration.status_v && cm.acceleration.status_d) {
        cm.acceleration.status_v0 = false
        cm.acceleration.status_t = false
        cm.acceleration.status_a = false
        // ex: 4 = (v1 - 0) / 5
        // #1: a = 20 / 5
        const step1 = +cm.acceleration.value_v1 - +cm.acceleration.value_v0
        // #2: a = 4
        const step2 = step1 / +cm.acceleration.value_t
        cm.acceleration.value_a = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['a','v1','v0', 't'])
    }
    // t, a, v1
    else if(cm.acceleration.status_v && cm.acceleration.status_t) {
        cm.acceleration.status_v = false
        cm.acceleration.status_t = false
        cm.acceleration.value_d = +(+cm.acceleration.value_v * +cm.acceleration.value_t).toFixed(3)
        formulaBorderHighlight('speed', ['d','v','t'])
    }
    // a, v1, v0
}

/**
 * @description formula Ek = 0.5 * m * v^2
 * state props (Ek, m, v)
 * - element
 * - value
 * - status
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
        formulaBorderHighlight('kinetic_energy', ['Ek','m','v'])
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
        formulaBorderHighlight('kinetic_energy', ['v','Ek','m'])
        
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
        formulaBorderHighlight('kinetic_energy', ['m','Ek','v'])
    }
}

/**
 * @description formula Ep = m * g (9.8) * h
 * state props (Ep, m, h)
 * - element
 * - value
 * - status
 */
export function formulaPotentialEnergy() {
    // Ek is unknown
    if(cm.potential_energy.status_m && cm.potential_energy.status_h) {
        cm.potential_energy.status_m = false
        cm.potential_energy.status_h = false
        // ex: Ek = 2 * 9.8 * 4
        const step1 = +cm.potential_energy.value_m * 9.8 * +cm.potential_energy.value_h
        cm.potential_energy.value_Ep = +step1.toFixed(3)
        formulaBorderHighlight('potential_energy', ['Ep','m','h'])
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
        formulaBorderHighlight('potential_energy', ['h','Ep','m'])
        
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
        formulaBorderHighlight('potential_energy', ['m','Ep','h'])
    }
}