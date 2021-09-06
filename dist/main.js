(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.dragable = factory());
}(this, (function () { 'use strict';

  function dragable(ele, options) {
      var x;
      var y;
      var offsetX;
      var offsetY;
      var elePositionX;
      var elePositionY;
      var calculate = function () {
          var move = { x: elePositionX + offsetX, y: elePositionY + offsetY };
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
      var mvFn = function (ev) {
          offsetX = ev.pageX - x;
          offsetY = ev.pageY - y;
          var move = calculate();
          switch (options.mode) {
              case 'horizontal':
                  ele.style.left = move.x + "px";
                  break;
              case 'vertical':
                  ele.style.top = move.y + "px";
                  break;
              case 'both':
                  ele.style.left = move.x + "px";
                  ele.style.top = move.y + "px";
                  break;
          }
      };
      var done = function () {
          document.removeEventListener('mousemove', mvFn);
          document.removeEventListener('mouseup', done);
      };
      ele.addEventListener('mousedown', function (ev) {
          elePositionX = ele === null || ele === void 0 ? void 0 : ele.offsetLeft;
          elePositionY = ele === null || ele === void 0 ? void 0 : ele.offsetTop;
          x = ev.pageX;
          y = ev.pageY;
          document.addEventListener('mousemove', mvFn);
          document.addEventListener('mouseup', done);
      });
  }

  return dragable;

})));
