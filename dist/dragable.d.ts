interface options {
    mode: 'horizontal' | 'vertical' | 'both';
    boundary: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
export default function Dragable(ele: HTMLElement, options: options): void;
export {};
