export interface IMiscContext {
    currentPage: string
}

export type MouseEventType = Event & {currentTarget: EventTarget & (HTMLButtonElement|HTMLAnchorElement)}
export type FormEventType = Event & {currentTarget: EventTarget & HTMLFormElement}

type ClassicalMechanicsStates = 'force'|'speed'
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