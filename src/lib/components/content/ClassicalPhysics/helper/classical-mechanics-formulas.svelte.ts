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
 * @description do math operation and turn off input status
 * @param subject 
 * formula subject
 * @param unitList 
 * list of unit that will do operation ['a', 'b'], can be constant number ['0.5', 'x']
 * @param operator 
 * math operator + - * / ..etc
 * @returns 
 */
function MathOperation(subject: IMathOperation['subject'], unitList: string[], operator: IMathOperation['operator']) {
    const checkOperator = operator.match(/\+$|\-$|\*$|\/$|pow~\d+$|sqrt$/)
    // only do math operation if it exist in the regex
    if(checkOperator) {
        let isConstantNumber = false
        const parsedUnitList = []
        // loop unit list
        for(let unit of unitList) {
            // there is constant number in unit list
            if(!isNaN(+unit)) {
                isConstantNumber = true
                parsedUnitList.push(+unit)
            } else {
                // only turn off input status if unit is not number
                cm[subject][`status_${unit}`] = false
                parsedUnitList.push(unit)
            }
        }
        // destruct operator
        const [tempOperator, tempParam] = checkOperator[0].split('~')
        // do math then return
        switch (tempOperator) {
            case '+':
                return isConstantNumber 
                    // constant number with variable
                    ? typeof parsedUnitList[0] == 'number'
                        ? +parsedUnitList[0] + +cm[subject][`value_${parsedUnitList[1]}`]
                        : +cm[subject][`value_${parsedUnitList[0]}`] + +parsedUnitList[1]
                    // only variables
                    : +cm[subject][`value_${parsedUnitList[0]}`] + +cm[subject][`value_${parsedUnitList[1]}`]
            case '-':
                return isConstantNumber 
                    // constant number with variable
                    ? typeof parsedUnitList[0] == 'number'
                        ? +parsedUnitList[0] - +cm[subject][`value_${parsedUnitList[1]}`]
                        : +cm[subject][`value_${parsedUnitList[0]}`] - +parsedUnitList[1]
                    // only variables
                    : +cm[subject][`value_${parsedUnitList[0]}`] - +cm[subject][`value_${parsedUnitList[1]}`]
            case '*':
                return isConstantNumber 
                    // constant number with variable
                    ? typeof parsedUnitList[0] == 'number'
                        ? +parsedUnitList[0] * +cm[subject][`value_${parsedUnitList[1]}`]
                        : +cm[subject][`value_${parsedUnitList[0]}`] * +parsedUnitList[1]
                    // only variables
                    : +cm[subject][`value_${parsedUnitList[0]}`] * +cm[subject][`value_${parsedUnitList[1]}`]
            case '/':
                return isConstantNumber 
                    // constant number with variable
                    ? typeof parsedUnitList[0] == 'number'
                        ? +parsedUnitList[0] / +cm[subject][`value_${parsedUnitList[1]}`]
                        : +cm[subject][`value_${parsedUnitList[0]}`] / +parsedUnitList[1]
                    // only variables
                    : +cm[subject][`value_${parsedUnitList[0]}`] / +cm[subject][`value_${parsedUnitList[1]}`]
            case 'pow':
                return isConstantNumber
                    ? Math.pow(+parsedUnitList[0], +tempParam)
                    : Math.pow(+cm[subject][`value_${parsedUnitList[0]}`], +tempParam)
            case 'sqrt':
                return isConstantNumber
                    ? Math.sqrt(+parsedUnitList[0])
                    : Math.sqrt(+cm[subject][`value_${parsedUnitList[0]}`])
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
        cm.force.value_F = +MathOperation('force', ['m', 'a'], '*').toFixed(3)
        formulaBorderHighlight('force', ['F','m','a'])
    }
    // a is unknown
    else if(cm.force.status_F && cm.force.status_m) {
        cm.force.value_a = +MathOperation('force', ['F', 'm'], '/').toFixed(3)
        formulaBorderHighlight('force', ['a','F','m'])
    }
    // m is unknown
    else if(cm.force.status_F && cm.force.status_a) {
        cm.force.value_m = +MathOperation('force', ['F', 'a'], '/').toFixed(3)
        formulaBorderHighlight('force', ['m','F','a'])
    }
}

/**
 * @description formula v = d / t
 * state props (v, d, t)
 * - element
 * - value
 * - status
 */
export function formulaSpeed() {
    if(cm.speed.status_d && cm.speed.status_t) {
        cm.speed.value_v = +MathOperation('speed', ['d', 't'], '/').toFixed(3)
        formulaBorderHighlight('speed', ['v','d','t'])
    }
    else if(cm.speed.status_v && cm.speed.status_d) {
        cm.speed.value_t = +MathOperation('speed', ['v', 'd'], '/').toFixed(3)
        formulaBorderHighlight('speed', ['t','v','d'])
    }
    else if(cm.speed.status_v && cm.speed.status_t) {
        cm.speed.value_d = +MathOperation('speed', ['d', 't'], '*').toFixed(3)
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
    // a is unknown
    if(cm.acceleration.status_v1 && cm.acceleration.status_v0 && cm.acceleration.status_t) {
        // ex: a = (20 - 0) / 5
        // #1: a = 20 / 5
        const step1 = +MathOperation('acceleration', ['v1', 'v0'], '-')
        // #2: a = 4
        const step2 = +MathOperation('acceleration', [`${step1}`, 't'], '/')
        cm.acceleration.value_a = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['a','v1','v0','t'])
    }
    // t is uknown
    else if(cm.acceleration.status_a && cm.acceleration.status_v1 && cm.acceleration.status_v0) {
        // ex: 4 = (20 - 0) / t
        // #1: 4 = 20 / t
        const step1 = +MathOperation('acceleration', ['v1', 'v0'], '-')
        // #2: 20 / 4 = t
        const step2 = +MathOperation('acceleration', [`${step1}`, 'a'], '/')
        cm.acceleration.value_t = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['t','a','v1','v0'])
    }
    // v1 is uknown
    else if(cm.acceleration.status_a && cm.acceleration.status_v0 && cm.acceleration.status_t) {
        // ex: 4 = (v1 - 0) / 5
        // #1: 0 + 5 * 4 = v1
        const step1 = +MathOperation('acceleration', ['a', 't'], '*')
        // #2: 0 + 20 = v1
        const step2 = +MathOperation('acceleration', [`v0`, `${step1}`], '+')
        cm.acceleration.value_v1 = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['v1','a','v0','t'])
    }
    // v0 is uknown
    else if(cm.acceleration.status_a && cm.acceleration.status_v1 && cm.acceleration.status_t) {
        // ex: 4 = (20 - v0) / 5
        // #1: 20 - 5 * 4 = v0
        const step1 = +MathOperation('acceleration', ['a', 't'], '*')
        // #2: 20 - 20 = v0
        const step2 = +MathOperation('acceleration', [`v1`, `${step1}`], '-')
        cm.acceleration.value_v0 = +step2.toFixed(3)
        // 1st index in array must be the answer element
        formulaBorderHighlight('acceleration', ['v0','a','v1','t'])
    }
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
        // ex: Ek = 0.5 * 5 * 2^2
        const step1 = +MathOperation('kinetic_energy', ['0.5', 'm'], '*')
        const step2 = +MathOperation('kinetic_energy', ['v'], 'pow~2')
        const step3 = step1 * step2
        cm.kinetic_energy.value_Ek = +step3.toFixed(3)
        formulaBorderHighlight('kinetic_energy', ['Ek','m','v'])
    }
    // v is unknown
    else if(cm.kinetic_energy.status_Ek && cm.kinetic_energy.status_m) {
        // #ex: 10 = 0.5 * 5 * v^2
        // #1: 10 = 2.5 * v^2
        const step1 = +MathOperation('kinetic_energy', ['0.5', 'm'], '*')
        // #2: 10 / 2.5 = v^2
        const step2 = +MathOperation('kinetic_energy', ['Ek', `${step1}`], '/')
        // #3: 4 = v^2 (square root)
        const step3 = Math.sqrt(step2)
        cm.kinetic_energy.value_v = +step3.toFixed(3)
        formulaBorderHighlight('kinetic_energy', ['v','Ek','m'])
        
    }
    // m is unknown
    else if(cm.kinetic_energy.status_Ek && cm.kinetic_energy.status_v) {
        // #ex: 10 = 0.5 * m * 2^2
        // #1: 10 = 0.5 * m * 4
        const step1 = +MathOperation('kinetic_energy', ['v'], 'pow~2')
        // #2: 10 = 2 * m
        const step2 = 0.5 * step1
        // #3: 10 / 2 = m
        const step3 = +MathOperation('kinetic_energy', ['Ek', `${step2}`], '/')
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
        // ex: Ek = 2 * 9.8 * 4
        const step1 = +MathOperation('potential_energy', ['h', `m`], '*') * 9.8
        cm.potential_energy.value_Ep = +step1.toFixed(3)
        formulaBorderHighlight('potential_energy', ['Ep','m','h'])
    }
    // h is unknown
    else if(cm.potential_energy.status_Ep && cm.potential_energy.status_m) {
        // ex: Ek = 2 * 9.8 * h
        // #1: 50 = 19.6 * h
        const step1 = +MathOperation('potential_energy', ['m', `9.8`], '*')
        // #2: 50 / 19.6 = h
        const step2 = +MathOperation('potential_energy', ['Ep', `${step1}`], '/')
        cm.potential_energy.value_h = +step2.toFixed(3)
        formulaBorderHighlight('potential_energy', ['h','Ep','m'])
        
    }
    // m is unknown
    else if(cm.potential_energy.status_Ep && cm.potential_energy.status_h) {
        // ex: Ek = m * 9.8 * 4
        // #1: 50 = 39.2 * m
        const step1 = +MathOperation('potential_energy', ['9.8', `h`], '*')
        // #2: 50 / 39.2 = m
        const step2 = +MathOperation('potential_energy', ['Ep', `${step1}`], '/')
        cm.potential_energy.value_m = +step2.toFixed(3)
        formulaBorderHighlight('potential_energy', ['m','Ep','h'])
    }
}

/**
 * @description formula p = m * v
 * state props (p, m, v)
 * - element
 * - value
 * - status
 */
export function formulaMomentum() {
    // p is unknown
    if(cm.momentum.status_m && cm.momentum.status_v) {
        cm.momentum.value_p = +MathOperation('momentum', ['m', 'v'], '*').toFixed(3)
        formulaBorderHighlight('momentum', ['p','m','v'])
    }
    // m is unknown
    else if(cm.momentum.status_p && cm.momentum.status_v) {
        cm.momentum.value_m = +MathOperation('momentum', ['p', 'v'], '/').toFixed(3)
        formulaBorderHighlight('momentum', ['m','p','v'])
    }
    // v is unknown
    else if(cm.momentum.status_p && cm.momentum.status_m) {
        cm.momentum.value_v = +MathOperation('momentum', ['p', 'm'], '/').toFixed(3)
        formulaBorderHighlight('momentum', ['v','p','m'])
    }
}

/**
 * @description formula J = p2 - p1
 * state props (J, p2, p1)
 * - element
 * - value
 * - status
 */
export function formulaImpulse() {
    // J is unknown
    if(cm.impulse.status_p2 && cm.impulse.status_p1) {
        cm.impulse.value_J = +MathOperation('impulse', ['p2', 'p1'], '-').toFixed(3)
        formulaBorderHighlight('impulse', ['J','p2','p1'])
    }
    // p2 is unknown
    else if(cm.impulse.status_J && cm.impulse.status_p1) {
        cm.impulse.value_p2 = +MathOperation('impulse', ['J', 'p1'], '+').toFixed(3)
        formulaBorderHighlight('impulse', ['p2','J','p1'])
    }
    // p1 is unknown
    else if(cm.impulse.status_J && cm.impulse.status_p2) {
        cm.impulse.value_p1 = +MathOperation('impulse', ['p2', 'J'], '-').toFixed(3)
        formulaBorderHighlight('impulse', ['p1','J','p2'])
    }
}