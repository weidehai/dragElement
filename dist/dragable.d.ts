interface options {
    mode: 'horizontal' | 'vertical' | 'both';
    boundary: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
interface dragable {
    ele: HTMLElement;
    options: options;
    event: Event;
    on: (ev: eventType, cb: Function) => void;
    emit: (ev: eventType) => void;
}
interface DragableConstructor {
    new (ele: HTMLElement, options: options): dragable;
}
interface Event {
    move: Function[];
}
declare type eventType = keyof Event;
declare const Dragable: DragableConstructor;
export default Dragable;
