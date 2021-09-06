interface options {
  mode: 'horizontal' | 'vertical' | 'both';
  boundary: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

interface Dragable {
  ele: HTMLElement;
  options: options;
}

interface Event {
  move: Function[];
}

type eventType = keyof Event;

const event: Event = {
  move: [],
};

function emit(ev: eventType) {
  event[ev].forEach((cb) => {
    cb();
  });
}

function init(dg: Dragable) {
  let x: number;
  let y: number;
  let offsetX: number;
  let offsetY: number;
  let elePositionX: number;
  let elePositionY: number;
  const { ele, options } = dg;
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
    emit('move');
  };
  const done = () => {
    document.removeEventListener('mousemove', mvFn);
    document.removeEventListener('mouseup', done);
    document.onselectstart = null;
    document.ondragstart = null;
  };
  ele.addEventListener('mousedown', (ev: MouseEvent) => {
    elePositionX = ele.offsetLeft;
    elePositionY = ele.offsetTop;
    x = ev.pageX;
    y = ev.pageY;
    // 防止drag事件和mousemove冲突
    document.onselectstart = function () {
      return false;
    };
    document.ondragstart = function () {
      return false;
    };
    document.addEventListener('mousemove', mvFn);
    document.addEventListener('mouseup', done);
  });
}

export default function Dragable(ele: HTMLElement, options: options): void {
  this.options = options;
  this.ele = ele;
  init(this);
}

Dragable.prototype.on = function (ev: eventType, cb: Function) {
  event[ev].push(cb);
};
