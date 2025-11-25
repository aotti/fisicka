import classical_mechanics_data from "../components/content/ClassicalPhysics/config/classical-mechanics.json"

export interface IMiscContext {
    currentPage: string
}

export type MouseEventType = Event & {currentTarget: EventTarget & (HTMLButtonElement|HTMLAnchorElement)}
export type FormEventType = Event & {currentTarget: EventTarget & HTMLFormElement}

type ClassicalMechanicsStates = keyof typeof classical_mechanics_data.keys
export interface IClassicalMechanics {
    state: {
        [key in ClassicalMechanicsStates]: {
            [key: string]: number|boolean
        }
    }
    props: {
        subjectId: keyof IClassicalMechanics['state'], 
        params: string[], 
        placeholders: string[], 
        operator: string, 
    },
}