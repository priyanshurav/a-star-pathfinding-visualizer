import getElement from './getElement';
import Point from './Point';

export default (grid: Point[][], eraseWalls = true): void => {
  document.querySelector('.no-valid-path-found-text')?.classList.add('hide');
  for (const pointArr of grid)
    for (const point of pointArr) {
      if (eraseWalls) point.wall = false;
      const el = getElement(point);
      el.className = '';
      if (point.equals(window.start)) el.classList.add('start');
      if (point.equals(window.dest)) el.classList.add('destination');
      if (!eraseWalls && point.wall === true) el.classList.add('wall');
    }
};
