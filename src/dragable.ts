interface options {
  mode: 'horizontal' | 'vertical' | 'both';
  boundary: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export default function dragable(ele: HTMLElement, options: options): void {
  let x: number;
  let y: number;
  let offsetX: number;
  let offsetY: number;
  let elePositionX: number;
  let elePositionY: number;
  const calculate = () => {
    const move: { x: number; y: number } = { x: elePositionX + offsetX, y: elePositionY + offsetY };
    if (move.y > options.boundary.bottom) {
      move.y = options.boundary.bottom;
    }
    if (move.y < options.boundary.top) {
      move.y = options.boundary.top;
    }
    if (move.x > options.boundary.right) {
      move.x = options.boundary.right;
    }
    if (move.x < options.boundary.left) {
      move.x = options.boundary.left;
    }
    return move;
  };
  const mvFn = (ev: MouseEvent) => {
    offsetX = ev.pageX - x;
    offsetY = ev.pageY - y;
    const move = calculate();
    switch (options.mode) {
      case 'horizontal':
        /* eslint-disable */
        ele.style.left = `${move.x}px`;
        break;
      case 'vertical':
        ele.style.top = `${move.y}px`;
        break;
      case 'both':
        ele.style.left = `${move.x}px`;
        ele.style.top = `${move.y}px`;
        /* eslint-enable */
        break;
      default:
        break;
    }
  };
  const done = () => {
    document.removeEventListener('mousemove', mvFn);
    document.removeEventListener('mouseup', done);
  };
  ele.addEventListener('mousedown', (ev: MouseEvent) => {
    elePositionX = ele.offsetLeft;
    elePositionY = ele.offsetTop;
    x = ev.pageX;
    y = ev.pageY;
    document.addEventListener('mousemove', mvFn);
    document.addEventListener('mouseup', done);
  });
}