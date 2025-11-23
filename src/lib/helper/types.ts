export interface IMiscContext {
    currentPage: string
}

export type MouseEventType = Event & {currentTarget: EventTarget & (HTMLButtonElement|HTMLAnchorElement)}
export type FormEventType = Event & {currentTarget: EventTarget & HTMLFormElement}