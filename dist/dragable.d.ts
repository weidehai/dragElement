interface options {
    mode: 'horizontal' | 'vertical' | 'both';
    boundary: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
}
export default function dragable(ele: HTMLElement, options: options): void;
export {};
